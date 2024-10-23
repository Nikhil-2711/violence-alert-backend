const express=require('express')
const routes=express.Router()
const usercontroller=require('../controllers/usercontroller')
const missioncontroller=require('../controllers/mission_controller')
const multer = require('multer');

// Configure Multer to store uploaded files in the `uploads` directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Directory to save files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Save files with unique names
  }
});

const upload = multer({ storage: storage }); // Initialize multer

routes.post('/store-basic-information',upload.single('profilephoto'),usercontroller.store_basic_information)
routes.post('/register', upload.fields([
    { name: 'info[aadhaar_document]', maxCount: 1 },
    { name: 'info[pan_document]', maxCount: 1 }
  ]), usercontroller.add_user);
routes.post('/login-with-google',usercontroller.login_with_google)
routes.post('/login',usercontroller.login_user)
routes.post('/update-location',usercontroller.updateLocation)
routes.post('/verify-otp',usercontroller.verifyOTP)
routes.post('/send-notification',usercontroller.send_notification)
routes.get('/fetch-emergency-contacts',usercontroller.fetch_emergency_contact)
routes.post('/fetch-user-by-mobilenumber',usercontroller.fetch_by_mobilenumber)
routes.post('/update-by-mobile',usercontroller.update_by_mobile)

routes.post('/send-mission-description',missioncontroller.add_mission_description)
routes.post('/update-mission-activity',missioncontroller.update_mission_activity)




module.exports=routes