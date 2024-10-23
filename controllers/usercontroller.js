const userService=require('../services/userservice')
// const admin = require('firebase-admin');
// const serviceAccount = require('../firebase/alert-project-f1be4-firebase-adminsdk-lv0ot-08136b6f15.json');
const multer = require('multer');
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });

  

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder where the files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

// Set multer to handle multiple file uploads
const upload = multer({ storage: storage }).fields([
  { name: 'aadhaar_document', maxCount: 1 },
  { name: 'pan_document', maxCount: 1 }
]);


class userController{

  async store_basic_information(req, res) {
    try {
      // Get form fields from req.body and file from req.file
      const data = req.body;
      const profilePhotoPath = req.file ? req.file.path : null;
  
      // Manually set adharnumber and pannumber to empty strings
      data.adharnumber = null;
      data.pannumber = null;
  
      // Add the profile photo path to the data object
      if (profilePhotoPath) {
        data.profilephoto = profilePhotoPath;
      }
  
      const otp = Math.floor(1000 + Math.random() * 9000);
  
      const response = await userService.storeBasicInformation(data); // Pass data to the service
      if (response) {
        res.status(200).json({
          status: true,
          message: "User's basic information stored successfully",
          data: {
            otp: otp,
            user_id: response._id
          }
        });
      } else {
        res.status(400).json({
          status: false,
          message: "User is not being able to register"
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message || "An error occurred"
      });
    }
  }
  
  
  async add_user(req, res) {
    try {
      const { id, info: rawInfo } = req.body; // Destructure 'info' and 'id' from req.body
      const files = req.files;
  
      // Copy the fields from 'info' object and handle file uploads
      const info = { ...rawInfo };
  
      // Attach uploaded files to the info object
      if (files['info[aadhaar_document]']) {
        info.aadhaar_document = files['info[aadhaar_document]'][0].path;
      }
      if (files['info[pan_document]']) {
        info.pan_document = files['info[pan_document]'][0].path;
      }
  
      console.log("User controller:", { id, info });
  
      // Call your service layer
      const response = await userService.addUser(id, info);
  
      if (response) {
        res.status(200).json({
          status: true,
          message: "User added successfully",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "User registration failed",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
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
                    "data":{
                      "token":response.token,
                      "otp":"1234",
                      "saviour":response.is_saviour
                    }
                })
            } else {
                res.status(400).json({
                    "status": false,
                    "message":  response.message,
                    "data":{}
                })
            }
        } catch (error) {
            res.status(500).json({
                "status":false,
                "message":error,
                "data":{}
            })
        }
        
    }
    async login_with_google(req,res){
      try {
        const data=req.body
        const response=await userService.loginWithGoogle(data)
        if(response){
          res.status(200).json({
            "status": true,
            "message": response.message,
            "data":{
              "token":response.token,
              "otp":"1234",
              "saviour":response.is_saviour
            }
        })
        }else{
          res.status(500).json({
            "status":false,
            "message":error,
            "data":{}
        })
        }
        
      } catch (error) {
        res.status(500).json({
          "status":false,
          "message":error,
          "data":{}
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

        res.json({ "status":true,message: "Location updated successfully" });

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
        // const response = await admin.messaging().send(message);
        res.status(200).send({ "status": true, message: 'Notification sent successfully!', data:response });
      } catch (error) {
        res.status(500).send({ "status": false, message: 'Error sending notification', error });
      }
    }
    async fetch_emergency_contact(req,res){
      try {
        
        const contactdata=await userService.fetchEmergencyContact()
        console.log("Emergency contacts:",contactdata);
        
        if(contactdata){
          res.status(200).send({ "status": true, message: 'Emergency contacts fetched successfully!', data:contactdata });
        }

      } catch (error) {
        res.status(500).send({ "status": false, message: 'Error fetching emergency contacts', data:{} });
      }
    }
    async fetch_by_mobilenumber(req,res){
      try {
        const mobilenumber=req.body.mobilenumber
        const response=await userService.fetchByMobileNumber(mobilenumber)
        console.log("User details:",response);
        if(response){
          res.status(200).send({ "status": true, message: 'User details fetched successfully!', data:response });
        }
      } catch (error) {
        res.status(500).send({ "status": false, message: 'Error fetching user details through mobilenumber', error });
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
              "status": true,
              message: "User details updated successfully!",
              data: response,
            });
        }
        
      } catch (error) {
        res.status(500).send({ "status": false, message: 'Error updating the user details', error });
      }
    }
}
module.exports=new userController()