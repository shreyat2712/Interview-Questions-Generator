const express=require('express');
const router=express.Router()
const jwt=require('jsonwebtoken');
const requireAuth = require('../middleware/auth');
const Question=require('../models/questions');

router.get('/getAllUserQuestions',requireAuth,async (req,res)=>{
    try {
        //retrieve the user id form the token 
        const bearerToken = req.headers.authorization;
        const token = bearerToken.split(" ")[1];
        // Verify and decode the token
        const decodedToken = jwt.verify(token, "somerandomtoken"); // Assuming JWT_SECRET is your secret key
        console.log('Decoded token is ',decodedToken);
        const userId=decodedToken.userId;
        //now use this id to retrieve the all the questions associated with this user id
        const allQuestions=await Question.find({userId:userId});
        console.log(allQuestions);
        res.status(200).json({"message":"success","Questions":allQuestions});

    } catch (error) {
       console.log(error);
       res.status(500).json({"message":"Internal Server Error !"}); 
    }
});

module.exports=router;
