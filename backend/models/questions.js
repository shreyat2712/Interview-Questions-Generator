const mongoose = require('mongoose');
const {Schema} = mongoose;



const questionschema = new Schema({
  question: String,
  answer: String,
  experience: String,
  level: String,
  subtopic: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' } // Reference to User model

});


//creating the model using questionSchema
const Questions=mongoose.model("Questions",questionschema);

module.exports=Questions;