const SECTION  = require("../../modals/sections.js")
async function sectionHandler(req,res) {
    const  {sectionName} = req.body;

    if(!sectionName){
        return res.json({
            msg:"sectionName is not received on the server.",
            success:false
        })
    }
    try {
        const result = await SECTION.create({
            sectionName:sectionName
        })

        if(result){
            return res.json({
                msg:"New Section added successfully.",
                success:true
            })
        }else{
            return res.json({
                msg:"Error while adding a new section",
                success:false
            })
        }
    } catch (error) {
        return res.json({
            msg:"Error occured in section handler.",
            error:error.message,
            success:false
        })
    }
}

async function get_Sections(req,res) {
    try {
        const result = await SECTION.find({});
        if(result){
            return res.json({
                result,
                success:true
            })
        }else{
            return res.json({
                msg:"Sections doesn't exist",
                success:true
            })
        }
    } catch (error) {
        return res.json({
            msg:"Error while fetching the sections",
            error:error.message,
            success:false
        })
    }
}


module.exports = {
    sectionHandler,get_Sections
}