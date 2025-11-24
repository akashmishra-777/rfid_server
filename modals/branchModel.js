const mongoose = require("mongoose")

const branchSchema = new mongoose.Schema({
    branchName:{
        type:String,
        required:true,
        unique:true
    },
    addedBy:{
        type:String,
        required:true
    }
},{timestamps:true})



const BRANCH = mongoose.model("branch",branchSchema)


module.exports = BRANCH