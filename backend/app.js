const express = require("express");
const db = require("./db/db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
//connection to database
db();
const app = express();
// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
const createQuestion = require("./routes/createQuestion");
const registerUser = require("./routes/registerUser");
const loginUser = require("./routes/loginUser");
const findQuestion = require("./routes/findQuestion");
const forgetPassword = require("./routes/forgetPassword");
const getUserQuestions = require("./routes/getUserQuestions");
const editQuestion = require("./routes/editQuestion");
const deleteQuestion = require("./routes/deleteQuestion");
const downloadQuestion = require("./routes/downloadQuestions");

//api's
app.use(createQuestion); //api to create a new question
app.use(registerUser); //api to register new users
app.use(loginUser); //api to login existing users
app.use(findQuestion); //api to find questions
app.use(forgetPassword); //api to reset the password
app.use(getUserQuestions); //api to retrieve all the questions associated with particular user Id
app.use(editQuestion); //api to edit the questions and their content
app.use(deleteQuestion); //api to delete the particular question
app.use(downloadQuestion); //api to download the questions
// deployment code
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("This is test api!!");
  });
}

// deployment code
app.get("/", (req, res) => {
  res.send("This is test api!!");
});

const PORT = process.env.PORT || 5000;
const port = 8000;
app.listen(port, () => {
  console.log(`server is running on port ${PORT}`);
});
