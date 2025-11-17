require("dotenv").config()
const express  =require("express")
const app = express()
const attendenceRouter = require("./routes/attendence.js")
const dbCOnnection = require("./db/db.js")
const auth  = require("./routes/registration.js")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/v1",attendenceRouter)
app.use("/v2",auth)


app.get("/",(req,res)=>{
    res.json({
        msg:"Online"
    })
})
app.listen(process.env.PORT,()=>{
    console.log(`SERVER IS RUNNING ON ${process.env.PORT}`)
})
