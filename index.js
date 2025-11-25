require("dotenv").config()
const express  =require("express")
const app = express()
const attendenceRouter = require("./routes/attendence.js")
const dbCOnnection = require("./db/db.js")
const auth  = require("./routes/registration.js")
const admin = require("./routes/admin.js")
const cors = require("cors")

app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.use(express.urlencoded({extended:true}))

app.use("/v1",attendenceRouter)
app.use("/v2",auth)
app.use("/features",admin)


app.get("/",(req,res)=>{
    res.json({
        msg:"Online"
    })
})
app.listen(process.env.PORT,()=>{
    console.log(`SERVER IS RUNNING ON ${process.env.PORT}`)
})
