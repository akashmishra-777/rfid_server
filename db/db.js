const mongoose = require("mongoose")
async function connectdb() {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("DATABASE CONNECTED SUCCESSFULLY")
    } catch (error) {
        console.log("Databse connection error")
        console.error(error)
    }
}


module.exports = connectdb()