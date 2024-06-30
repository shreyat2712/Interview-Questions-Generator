const express=require('express');
const router=express.Router();
const Question=require('../models/questions');
const requireAuth = require('../middleware/auth');

router.delete('/deleteQuestion/:questionId', requireAuth, async (req, res) => {
    try {
        const questionId = req.params.questionId;
        console.log(questionId);
        if (!questionId) {
            return res.status(400).json({ "message": "QuestionId is required !" });
        }

        // Find the question by its ID and delete it
        const deletedQuestion = await Question.findByIdAndDelete(questionId);

        // Check if the question exists and is successfully deleted
        if (!deletedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Send a success message as response
        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal Server Error !" });
    }
});

module.exports =router;