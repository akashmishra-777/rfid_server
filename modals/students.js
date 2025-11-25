const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const STUDENT_SCHEMA = new mongoose.Schema({
    idx:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"student"
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})




STUDENT_SCHEMA.pre("save",async function(next) {
    if(this.isModified(this.password)){
        this.password = await bcrypt.hashSync(this.password,10)
        next()
    }
    this.password = await bcrypt.hashSync(this.password,10)
    next()
})




const STUDENT_MODAL = mongoose.model("student",STUDENT_SCHEMA)


module.exports = STUDENT_MODAL