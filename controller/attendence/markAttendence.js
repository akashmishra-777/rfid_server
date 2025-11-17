const ATTENDENCE = require("../../modals/studentAttendence.js")
async function mark_attendence(req,res) {
    console.log(req.body.id)
    if(!req.body.id){
        return res.json({
            msg:"Student id is not received on the server.",
            success:false
        })
    }

    if(!req.body.name){
        return res.json({
            msg:"Student name is not received on the server.",
            success:false
        })
    }

    if(!req.body.phone){
        return res.json({
            msg:"Student phone number is not received on the server.",
            success:false
        })
    }

    if(!req.body.branch){
        return res.json({
            msg:"Student branch data  is not received on the server.",
            success:false
        })
    }

    if(!req.body.section){
        return res.json({
            msg:"Student section data is not received on the server.",
            success:false
        })
    }


    const {id,name,branch,section,phone} = req.body


    try {
        const checkTodaysAttendence = await ATTENDENCE.find({idx:id,date:new Date().toISOString().split("T")[0]})
        if(checkTodaysAttendence.length == 0){
            const result = await ATTENDENCE.create({
                idx:id,
                name,
                branch,
                section,
                phone,
                punchIn:true
            })


            if(result){
                return res.json({
                    msg:"Punched In",
                    success:true
                })
            }else{
                return res.json({
                    msg:"Error while marking attendence",
                    success:false
                })
            }
        }else{

            try {
                const result  = await ATTENDENCE.updateOne({idx:id},{punchOut:true})
                if(result){
                    return res.json({
                        msg:"Punched Out",
                        success:true
                    })
                }
            } catch (error) {
                return res.json({
                    msg:error.message,
                    comingFrom:"PunchOut code.",
                    success:false
                })
            }

        }

    } catch (error) {
        return res.json({
            msg:error.message,
            success:false
        })
    }
}


module.exports =  mark_attendence