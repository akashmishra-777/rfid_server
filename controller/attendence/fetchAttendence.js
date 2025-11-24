const ATTENDENCE = require("../../modals/studentAttendence.js")

async function fetch_total_attendence(req,res) {
    if(!req.body.id){
        return res.json({
            msg:"Student id is required",
            success:false
        })
    }


     try {
        const result = await ATTENDENCE.find({idx:req.body.id})
        if(result){

            const finalResult = result.filter((data)=>{
                if(data.punchIn == true && data.punchOut == true){
                    return data
                }
            })

            return res.json({
                msg:"Record found",
                data:finalResult,
                count:finalResult.length || 0,
                success:true
            })
        }else{
                return res.json({
                msg:"No record found",
                success:false
            })
        }
    } catch (error) {
        
         return res.json({
                msg:error.message,
                success:false
            })
    }

}

async function fetch_attendence_with_date(req,res) {
    if(!req.body.id){
        return res.json({
            msg:"Student id is required",
            success:false
        })
    }

    if(!req.body.filterDate){
       return res.json({
            msg:"Filter date is required.",
            success:false
        })
    }


    try {
        const result = await ATTENDENCE.find({idx:req.body.id,date:req.body.filterDate})
        if(result){
            return res.json({
                msg:"Record found",
                data:result,
                success:true
            })
        }else{
                return res.json({
                msg:"No record found",
                success:false
            })
        }
    } catch (error) {
        
         return res.json({
                msg:error.message,
                success:false
            })
    }

}



async function fetch_attendence_with_month_year(req,res) {
    if(!req.body.id){
        return res.json({
            msg:"Student id is required",
            success:false
        })
    }

    if(!req.body.monthYear){
       return res.json({
            msg:"Filter month and year is required.",
            success:false
        })
    }


    try {
        const result = await ATTENDENCE.find({idx:req.body.id})
        if(result){

            let datax = result.filter((data)=>{
                if(data.date.substring(0,7) === req.body.monthYear){
                    return data
                }
            })

            return res.json({
                msg:"Record found",
                data:datax,
                success:true
            })
        }else{
                return res.json({
                msg:"No record found",
                success:false
            })
        }
    } catch (error) {
        
         return res.json({
                msg:error.message,
                success:false
            })
    }

}


module.exports = {fetch_total_attendence,fetch_attendence_with_date,fetch_attendence_with_month_year}