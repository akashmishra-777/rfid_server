const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const TEACHER_SCHEMA = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    role:{
        type:String,
        default:"teacher"
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




TEACHER_SCHEMA.pre("save",async function(next) {
     if(this.isModified(this.password)){
            this.password = await bcrypt.hashSync(this.password,10)
            next()
        }
        this.password = await bcrypt.hashSync(this.password,10)
        next()

    next()
})




const TEACHERS_MODAL = mongoose.model("teacher",TEACHER_SCHEMA)


module.exports = TEACHERS_MODAL