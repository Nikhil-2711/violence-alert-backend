const userService=require('../services/userservice')

class userController{
    async add_user(req,res){
        try {
          const data = req.body;
          console.log("User controller:", data);

          // const aadhaarValidation = await axios.post(
          //   "https://digilocker.gov.in/api/aadhaar",
          //   {
          //     aadhaarNumber
          //   }
          // );

          // const panValidation = await axios.post(
          //   "https://digilocker.gov.in/api/pan",
          //   {
          //     panNumber
          //   }
          // );

          const response = await userService.addUser(data);
          console.log("Log result",response);
          
          if (response) {
            res.status(200).json({
              status: true,
              message: "User added successfully",
            });
          } else {
            res.status(400).json({
              status: false,
              message: "User is not being able to register",
            });
          }
        } catch (error) {
            res.status(500).json({
                "status":false,
                "message":error
            }) 
        }
    }
    async login_user(req,res){
        try {
            const data = req.body
            console.log("login controller data:", data);

            const response = await userService.loginUser(data)
            if (response) {
                res.status(200).json({
                    "status": true,
                    "message": response.message,
                    "token":response.token,
                    "otp":"1234"
                })
            } else {
                res.status(400).json({
                    "status": false,
                    "message":  response.message
                })
            }
        } catch (error) {
            res.status(500).json({
                "status":false,
                "message":error
            })
        }
        
    }

    async updateLocation(req,res){
      try {

        const data = req.body;

        const updatedData=await userService.update_location(data)
        if (updatedData === null) {
          return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Location updated successfully" });

      } catch (error) {
        res.status(500).json({
          "status":false,
          "message":error
      })
      }
    }
    async verifyOTP(req,res){
      try {
        const data=req.body

        if(data.otp=="1234"){
          res.status(200).json({
            "status":true,
            "message":"OTP verified successfully"
          })
        }else{
          res.status(400).json({
            "status":false,
            "message":"Invalid OTP"
          })
        }
        
      } catch (error) {
        res.status(500).json({
          "status":false,
          "message":error
      })
      }
    }
}
module.exports=new userController()