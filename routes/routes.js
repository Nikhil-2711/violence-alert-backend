const express=require('express')
const routes=express.Router()
const usercontroller=require('../controllers/usercontroller')

routes.post('/register',usercontroller.add_user)
routes.post('/login',usercontroller.login_user)
routes.post('/update-location',usercontroller.updateLocation)
routes.post('/verify-otp',usercontroller.verifyOTP)


module.exports=routes