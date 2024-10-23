const mongoose = require('mongoose');

const userschema=new mongoose.Schema({
    profilephoto:{
        type: String
    },
    firstname:{
        type:String
    },
    dateofbirth:{
        type:String
    },
    gender:{
        type:String
    },
    saviour:{
        type:Boolean
    },
    email:{
        type:String
    },
    mobilenumber:{
        type:Number,
        unique:true
    },
    occupation:{
        type:String
    },
    password:{
        type:String
    },
    adharnumber: {
        type: String,
        unique: true,
        sparse: true,  
        default: null 
    },
    pannumber: {
        type: String,
        unique: true,
        sparse: true,
        default: null
    },
    latitude:{
        type:String
    },
    longitude:{
        type:String
    },
    social_id:{
        type:String
    },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    aadhaar_document:{
        type:String
    },
    pan_document:{
        type:String
    }
})

module.exports = mongoose.model('alert_user', userschema);