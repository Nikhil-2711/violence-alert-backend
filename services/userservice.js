const usermodel=require('../models/usermodel')

class userService{

    async addUser(data){
        console.log("Service user data:",data);

        const saltRounds=10
        const hashed_password=await bcrypt.hash(data.password,saltRounds)
        data.password=hashed_password
        
        const response=await usermodel(data)
        return response.save()
    }

    async loginUser(data){
        console.log("Service login data:",data);
        
        const login_info=await usermodel.findOne({"mobilenumber":data.mobilenumber})
        console.log("login information:",login_info);
        const verify_pwd=await bcrypt.compare(data.password,login_info.password)
        if (verify_pwd===true){
            return{
                "message":"User successfully logged in",
                "data":login_info
            }
        }else{
            return{
                "message":"Please enter correct credentials"
            }
        }
    }
}

module.exports=new userService()