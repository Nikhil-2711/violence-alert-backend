const usermodel=require('../models/usermodel')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

class userService{

    async addUser(data){
       try {
        console.log("Service user data:",data);

        const saltRounds=10
        const hashed_password=await bcrypt.hash(data.password,saltRounds)
        data.password=hashed_password
        
        const response=await usermodel(data)
        return response.save()
        
       } catch (error) {
        console.log("Error service:",error);
        
       }
    }

    async loginUser(data) {
        console.log("Service login data:", data);
        
        // Find user by mobile number
        const login_info = await usermodel.findOne({ "mobilenumber": data.mobilenumber });
        
        // If user not found
        if (!login_info) {
            return {
                "message": "User not found. Please register first."
            };
        }
    
        // Verify password
        const verify_pwd = await bcrypt.compare(data.password, login_info.password);
        
        if (verify_pwd === true) {
          const token = jwt.sign(
            {
              mobilenumber: login_info.mobilenumber,
              email: login_info.email,
              latitude:data.latitude,
              longitude:data.longitude
            },
            JWT_SECRET,
            { expiresIn: "1h" }
          );
          
          const updatedUser = await usermodel.updateOne(
            { _id: login_info._id },
            {
              $set: {
                latitude: data.latitude,
                longitude: data.longitude,
              },
            }
          );
          console.log("token", token);

          // Return token and success message
          return {
            is_saviour:login_info.saviour,
            message: "User successfully logged in",
            token: token,
          };
        } else {
            return {
                "message": "Please enter correct credentials"
            };
        }
    }
    async update_location(data){
        const updatedUser = await usermodel.updateOne(
            { mobilenumber: data.mobilenumber },  
            {
                $set: {
                    latitude: data.latitude,
                    longitude: data.longitude
                }
            }
        );
        return updatedUser
    }
    async fetchEmergencyContact(){
      const data=await usermodel.find({saviour:true})
      return data
    }
    async fetchByMobileNumber(mobilenumber){
      const data=await usermodel.findOne({mobilenumber:mobilenumber})
      return data
    }
    async updateByMobile(mobilenumber,editedData){
      const res=await usermodel.updateOne(
        {mobilenumber:mobilenumber},
        {
          $set:{
            ...editedData
          }
        }
      )
      return res
    }
}

module.exports=new userService()