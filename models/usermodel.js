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
        type:Number
    },
    occupation:{
        type:String
    },
    password:{
        type:String
    },
    adharnumber:{
        type:String,
        unique:true
    },
    pannumber:{
        type:String,
        unique:true
    },
    latitude:{
        type:String
    },
    longitude:{
        type:String
    }
})

module.exports = mongoose.model('alert_user', userschema);