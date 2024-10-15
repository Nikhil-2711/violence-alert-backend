const express=require('express')
const routes=express.Router()
const usercontroller=require('../controllers/usercontroller')
const missioncontroller=require('../controllers/mission_controller')

routes.post('/register',usercontroller.add_user)
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