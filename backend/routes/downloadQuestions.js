const express = require('express');
const PDFDocument = require('pdfkit');
const router = express.Router();
const Question = require('../models/questions');

router.post('/downloadQuestion', async (req, res) => {
    try {
        const { topics, levelOfExp, levelOfQue, numberOfQue } = req.body;

        // Retrieve questions from the database based on the provided filters
        const questions = await Question.find({
            $and: [
                { experience: levelOfExp },
                { level: levelOfQue },
                { subtopic: topics }
            ]
        });
        const x=numberOfQue;
        // Create a new PDF document
        const doc = new PDFDocument();
        console.log(questions);
        // Add questions to the PDF document
        questions.forEach((question, index) => {
            doc.text(`${index + 1}. Question: ${question.question}`);
            doc.text(`   Answer: ${question.answer}`);
            doc.text(`   Experience: ${question.experience}, Level: ${question.level}, Subtopic: ${question.subtopic}`);
            doc.moveDown();
        });
        
        // Finalize the PDF document
        doc.end();
        
        // Set response headers to indicate that the response contains a PDF file
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="questions.pdf"');

        // Send the generated PDF file as the response
        doc.pipe(res);
    } catch (error) {
        console.error('Error downloading questions:', error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
});

module.exports = router;
