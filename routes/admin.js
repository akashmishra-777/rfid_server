const router = require("express").Router()
const {getBranches,branchHandler} = require("../controller/admin/branchHandler.js")
const {get_Sections,sectionHandler} = require("../controller/admin/sectionHandler.js")
const STUDENT = require("../modals/students.js")
const TEACHER = require("../modals/teachersRegistration.js")

router.post("/add_branches",branchHandler)

router.get("/get_branches",getBranches)

router.post("/add_sections",sectionHandler)

router.get("/get_sections",get_Sections)

router.post("/get_student_data",async (req,res)=>{
    if(!req.body.id){
        return res.json({
            success:false,
            msg:"Id is not received on the server."
        })
    }


    try {
        const data = await STUDENT.find({_id:req.body.id})
        if(data){
            return res.json({
                data,
                success:true
            })
        }else{
            return json({
                msg:"Error while fetching the student data.",
                success:false
            })
        }
    } catch (error) {
        return res.json({
                err:error.message,
                success:false
            })
    }
})



router.post("/get_teacher_data",async (req,res)=>{
    if(!req.body.id){
        return res.json({
            success:false,
            msg:"Id is not received on the server."
        })
    }


    try {
        const data = await TEACHER.find({_id:id})
        if(data){
            return res.json({
                data,
                success:true
            })
        }else{
            return json({
                msg:"Error while fetching the student data.",
                success:false
            })
        }
    } catch (error) {
        return json({
                err:error.message,
                success:false
            })
    }
})


module.exports = router