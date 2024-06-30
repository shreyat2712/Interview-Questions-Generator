const express = require('express');
const router=express.Router();
const Question=require('../models/questions');
const requireAuth = require('../middleware/auth');

router.patch('/updateQuestion',requireAuth,async (req,res)=>{
    try {
        const {question,answer,questionId}=req.body;
        console.log('Question id is ',questionId);
        // Find the question by its ID and update its fields
        const updatedQuestion = await Question.findByIdAndUpdate(
            questionId,
            { question, answer },
            { new: true } // To return the updated document
        );

        // Check if the question exists and is successfully updated
        if (!updatedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }
        console.log('Updated document is ',updatedQuestion);
        res.status(200).json({"message":"updated successfully !"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"Internal Server Error !"});
    }
});

module.exports=router;