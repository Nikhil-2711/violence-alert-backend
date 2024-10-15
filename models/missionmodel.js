const mongoose = require('mongoose');

const missionSchema=new mongoose.Schema({
    victim_id:{
        type:String
    },
    alert_type:{
        type:String
    },
    description:{
        type:String
    },
    longitude:{
        type:String
    },
    latitude:{
        type:String
    },
    active:{
        type:Boolean
    }
})

module.exports = mongoose.model('mission', missionSchema);