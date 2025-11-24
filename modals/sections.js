const mongoose = require("mongoose")
const section_schema = new mongoose.Schema({
    sectionName:{
        type:String,
        required:true,
        unique:true
    },
},{timestamps:true})


const SECTION = mongoose.model("section",section_schema);


module.exports = SECTION