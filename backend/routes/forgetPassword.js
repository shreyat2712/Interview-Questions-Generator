const express = require('express');
const user=require('../models/user');
const router=express.Router();

router.post('/forgetPassword',async (req,res)=>{
    try {
        const {email,newpassword}=req.body;
        //check whether account exists with this mail
        const existingUser=user.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({"message":"No account exists with this mail !"});
        }
        
        //update the password
        await user.updateOne({ email: email }, { $set: { password: newpassword }});

        res.status(200).json({"message":"Password updated !"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"Internal Server Error !"});
    }
});

module.exports = router;