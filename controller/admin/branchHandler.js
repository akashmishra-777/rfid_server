const BRANCH = require("../../modals/branchModel.js")
async function branchHandler(req,res) {
    const {branchName,by} = req.body;
    if(!branchName){
        return res.json({
            success:false,
            msg:"Branch name didn't received on the server."
        })
    }

    try {
        const result = await BRANCH.create({
            branchName:branchName,
            addedBy:by
        })

        if(result){
            return res.json({
                msg:"New branch added successfully.",
                success:true
            })
        }else{
            return res.json({
                msg:"Error while inserting data in branch handler",
                success:false
            })
        }
    } catch (error) {
        return res.json({
            msg:"Error in branch handler",
            error:error.message,
            success:false
        })
    }

}


async function getBranches(req,res) {
    try {
        const result = await BRANCH.find({});
        if(result){
            return res.json({
                result,
                success:true
            })
        }else{
            return res.json({
                msg:"Branches doesn't exists",
                success:true
            })
        }
    } catch (error) {
        return res.json({
            msg:"Error in get branches router",
            success:false
        })
    }
}

module.exports = {
    branchHandler,getBranches
}