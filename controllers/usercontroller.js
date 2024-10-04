const userService=require('../services/userservice')

class userController{
    async add_user(req,res){
        try {
          const data = req.body;
          console.log("User controller:", data);

          const aadhaarValidation = await axios.post(
            "https://digilocker.gov.in/api/aadhaar",
            {
              aadhaarNumber
            }
          );

          const panValidation = await axios.post(
            "https://digilocker.gov.in/api/pan",
            {
              panNumber
            }
          );

          const response = await userService.addUser(data);
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
                    "data":response.data
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
}
module.exports=new userController()