const mongoose = require("mongoose")


const ATTENDENCE_SCHEMA = new mongoose.Schema({
    idx:{
        type:String,
        required:true,
        unique:true
    },
    name : {
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:new Date().toISOString().split("T")[0]
    },
    branch:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    punchIn:{
        type:Boolean,
        default:false,
    },
    punchOut:{
        type:Boolean,
        default:false
    },
    hour: {
    type: Number,
    default: () => new Date().getHours() % 12 || 12
    },
    minute: {
        type: Number,
        default: () => new Date().getMinutes()
    },
    ampm: {
        type: String,
        default: () => new Date().getHours() >= 12 ? "PM" : "AM"
    }
},
{timestamps:true}
)


const ATTENDENCE_MODAL = mongoose.model("attendence",ATTENDENCE_SCHEMA)


module.exports = ATTENDENCE_MODAL