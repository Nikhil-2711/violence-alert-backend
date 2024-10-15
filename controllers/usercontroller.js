const userService=require('../services/userservice')
const admin = require('firebase-admin');
const serviceAccount = require('../firebase/alert-project-f1be4-firebase-adminsdk-lv0ot-08136b6f15.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

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
            console.log("Login response:",response);
            
            if (response) {
                res.status(200).json({
                    "status": true,
                    "message": response.message,
                    "token":response.token,
                    "otp":"1234",
                    "saviour":response.is_saviour
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

    async send_notification(req,res){
      const { token, title, body } = req.body;
  
      const message = {
        notification: {
          title: title,
          body: body
        },
        token: token, // This is the FCM token of the mobile device
      };
    
      try {
        const response = await admin.messaging().send(message);
        res.status(200).send({ success: true, message: 'Notification sent successfully!', response });
      } catch (error) {
        res.status(500).send({ success: false, message: 'Error sending notification', error });
      }
    }
    async fetch_emergency_contact(req,res){
      try {
        
        const contactdata=await userService.fetchEmergencyContact()
        console.log("Emergency contacts:",contactdata);
        
        if(contactdata){
          res.status(200).send({ success: true, message: 'Emergency contacts fetched successfully!', data:contactdata });
        }

      } catch (error) {
        res.status(500).send({ success: false, message: 'Error fetching emergency contacts', error });
      }
    }
    async fetch_by_mobilenumber(req,res){
      try {
        const mobilenumber=req.body.mobilenumber
        const response=await userService.fetchByMobileNumber(mobilenumber)
        console.log("User details:",response);
        if(response){
          res.status(200).send({ success: true, message: 'User details fetched successfully!', data:response });
        }
      } catch (error) {
        res.status(500).send({ success: false, message: 'Error fetching user details through mobilenumber', error });
      }
    }
    async update_by_mobile(req,res){
      try {
        const mobilenumber = req.body.mobilenumber;
        const editedData = req.body.data;
        const response = await userService.updateByMobile(mobilenumber, editedData);
        if (response) {
          res
            .status(200)
            .send({
              success: true,
              message: "User details updated successfully!",
              data: response,
            });
        }
        
      } catch (error) {
        res.status(500).send({ success: false, message: 'Error updating the user details', error });
      }
    }
}
module.exports=new userController()