const express = require('express');
const jwt = require("jsonwebtoken");
const Question=require('../models/questions');
const requireAuth=require('../middleware/auth');
const router=express.Router();


//requireAuth middleware will make sure that only people with valid jwt token can upload question 

router.post('/uploadquestion',requireAuth, async(req, res) => {

    console.log(req.body);
    const {question,answer,experience,level,subtopic}=req.body;
    //retrieve the user id form the token 
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    // Verify and decode the token
    const decodedToken = jwt.verify(token, "somerandomtoken"); // Assuming JWT_SECRET is your secret key
    console.log('Decoded token is ',decodedToken);
    const userId=decodedToken.userId;
    console.log('User Id is ',userId);
    try {
        const que = await Question.create( {question, answer, experience, level, subtopic , userId});
        console.log("uploaded successfully");
        res.status(200).json({"message":"Question uploaded !"});
    } 
    catch (error) {
    //   const errors = handleErrors(error);
        console.log('Error ',error);
        res.status(400).json({ error });
    }
})


module.exports=router;