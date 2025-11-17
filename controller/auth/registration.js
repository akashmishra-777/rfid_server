const STUDENT_MODAL = require("../../modals/students.js")
const TEACHER_MODAL = require("../../modals/teachersRegistration.js")

async function Registration(req,res) {


    if(!req.body.name){
        return res.json({
            success:false,
            msg:"Name is required."
        })
    }

    if(!req.body.email){
        return res.json({
            success:false,
            msg:"Email is required."
        })
    }

    if(!req.body.phone){
        return res.json({
            success:false,
            msg:"Phone is required."
        })
    }


    if(!req.body.password){
        return res.json({
            success:false,
            msg:"Password is required."
        })
    }


    if(!req.body.role){
        return res.json({
            success:false,
            msg:"Role is required."
        })
    }
    
    
    

    const {name,phone,email,role,password} = req.body;
    console.log(role)
   if(role == "student"){
    try {
        const checkUser = await STUDENT_MODAL.findOne({email:email})
        if (!checkUser){
            const result = await STUDENT_MODAL.create({
                name:name,
                email:email,
                password:password,
                role:role,
                phone:phone
            })

            if(result){
               return res.json({
                    success:true,
                    msg:"User registered successfully."
                })
            }else{
                return res.json({
                    success:false,
                    msg:"Error while registering user."
                })
            }
        }else{
           return  res.json({
                success:false,
                msg:"User already exists with these details."
            })
        }
    } catch (error) {
        return res.json({
            msg:error.message,
            success:false
        })
    }
   }else{
    try {
        const checkUser = await TEACHER_MODAL.findOne({email:email})
        if(!checkUser){
            const result = await TEACHER_MODAL.create({
                name,
                email,
                password,
                role,
                phone
            })

            if(result){
                return res.json({
                    msg:"User registered successfully.",
                    success:true
                })
            }
        }else{
            return res.json({
                msg:"User already exists.",
                success:false
            })
        }
    } catch (error) {
         return  res.json({
                success:false,
                msg:"User already exists with these details.",
                error:error.message
            })
    }
   }


   return res.json({
    success:false,
    msg:"Both roles didn't matched"
   })
}


module.exports = Registration