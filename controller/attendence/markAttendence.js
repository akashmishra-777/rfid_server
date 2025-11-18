const ATTENDENCE = require("../../modals/studentAttendence.js")
async function mark_attendence(req,res) {
    console.log(req.body.id)
    if(!req.body.id){
        return res.status(501).json({
            msg:"Student id is not received on the server.",
            success:false
        })
    }

    if(!req.body.name){
        return res.status(501).json({
            msg:"Student name is not received on the server.",
            success:false
        })
    }

    if(!req.body.phone){
        return res.status(501).json({
            msg:"Student phone number is not received on the server.",
            success:false
        })
    }

    if(!req.body.branch){
        return res.status(501).json({
            msg:"Student branch data  is not received on the server.",
            success:false
        })
    }

    if(!req.body.section){
        return res.status(501).json({
            msg:"Student section data is not received on the server.",
            success:false
        })
    }


    const {id,name,branch,section,phone} = req.body


     try {

        // Get today's date in YYYY-MM-DD
        const today = new Date().toISOString().split("T")[0];
        console.log(today)
        // Check if today's entry already exists
        const existing = await ATTENDENCE.findOne({ idx: id, date: today });
        console.log(existing)
        // ---------------------------------------------------
        // CASE 1: FIRST ENTRY OF TODAY → PUNCH IN
        // ---------------------------------------------------
        if (!existing) {
            console.log("existing")
            const result = await ATTENDENCE.create({
                idx: id,
                name,
                branch,
                section,
                phone,
                date: today,     // IMPORTANT!!!
                punchIn: true,
                punchOut: false
            });

            console.log("Not working")
            return res.json({
                msg: "Punched In",
                success: true,
                data: result
            });
        }

        // ---------------------------------------------------
        // CASE 2: TODAY'S PUNCHOUT ALREADY DONE
        // ---------------------------------------------------
        if (existing.punchOut === true) {
            return res.status(501).json({
                msg: "Already Punched Out.",
                success: false
            });
        }

        // ---------------------------------------------------
        // CASE 3: RECORD EXISTS → PUNCH OUT
        // ---------------------------------------------------
        const update = await ATTENDENCE.updateOne(
            { idx: id, date: today },
            { punchOut: true }
        );

        if (update.modifiedCount === 1) {
            return res.json({
                msg: "Punched Out.",
                success: true
            });
        }

        return res.status(501).json({
            msg: "Failed to Punch Out",
            success: false
        });

    } catch (error) {
        return res.status(501).json({
            msg: error.message,
            success: false
        });
    }
}


module.exports =  mark_attendence