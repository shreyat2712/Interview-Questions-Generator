const express = require('express');
const Question=require('../models/questions');
const requireAuth = require('../middleware/auth');
const router=express.Router();


// requireAuth middleware will make sure that only people with valid jwt token can upload question 

// router.post('/findquestion',requireAuth, async(req, res) => {

//     console.log(req.body);
//     const {topics,levelOfExp,levelOfQue,numberOfQue}=req.body;

//     try {
//         const que = await Question.find({
//             $and: [
//                 { experience: levelOfExp },
//                 { level: levelOfQue },
//                 { subtopic: topics }
//             ]
//         });
//         let x=numberOfQue;
//         if(x < que.length){
//             que.splice(0, que.length - x);
//         }
//        console.log("Questions are ",que);
//        res.status(200).json({que});
//     } 
//     catch (error) {
//     //   const errors = handleErrors(error);
//         console.log('Error ',error);
//         res.status(400).json({ error });
//     }
// })


// module.exports=router;


// const express = require('express');
// const Question = require('../models/questions');
// const router = express.Router();

// Shuffle function to randomize array elements
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

router.post('/findquestion', async (req, res) => {
    console.log(req.body);
    const { topics, levelOfExp, levelOfQue, numberOfQue } = req.body;

    try {
        let que = await Question.find({
            $and: [
                { experience: levelOfExp },
                { level: levelOfQue },
                { subtopic: topics }
            ]
        });
        // console.log('Total questions are ',que);
        // Shuffle the questions array
        que = shuffleArray(que);

        let x=numberOfQue;
        if(x < que.length){
            que.splice(0, que.length - x);
        }

        
        console.log("Questions are ", que);
        res.status(200).json({que});
    } catch (error) {
        console.log('Error ', error);
        res.status(400).json({ error });
    }
})

module.exports = router;
