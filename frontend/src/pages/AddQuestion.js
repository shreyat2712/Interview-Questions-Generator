import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import "./AddQuestion.css";
// import { TextArea } from "@progress/kendo-react-inputs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
const AddQuestion = () => {
  const userLogged = JSON.parse(localStorage.getItem("isLoggedIn"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogged) {
      navigate("/");
    }
  }, [navigate, userLogged]);

  const topics = ["Core Java", "OOPS", "DBMS", "JavaScript"]
  // const lvlOfExp = ["0 YOE", "1-2 YOE", "3-4 YOE", "5+ YOE"];
  const lvlOfQues = ["Beginner", "Medium", "Hard"];

  const [subtopic, setSubtopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("");
  const [experience, setExperience] = useState("0 YOE");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [user, setUser] = useState();
  const [token, setToken] = useState("");

  // useEffect(() => {
  //   // Retrieve token from localStorage
  //   const storedToken = localStorage.getItem("userInfo");
  //   if (storedToken) {
  //   }
  // }, [subtopic]);

  useEffect(() => {
    // Retrieve userinfo object from localStorage
    const userinfoString = localStorage.getItem("userInfo");
    if (userinfoString) {
      const userinfo = JSON.parse(userinfoString);
      // Extract token from userinfo
      const storedToken = userinfo.token;
      if (storedToken) {
        console.log("token");
        setToken(storedToken);
        console.log(token);
      }
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!subtopic || !level || !question || !answer || !experience) {
      console.log("Please fill topic");
      setLoading(false);
      return;
    }
    try {
      console.log("trying");
      console.log(level, question, answer, experience, subtopic);
      const config = {
        headers: {
          // "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "/uploadquestion",
        { question, answer, experience, level, subtopic },
        config
      );
      setUser(data);
      // localStorage.setItem("userInfo", JSON.stringify(data));
      // localStorage.setItem("isLoggedIn", true);
      setLoading(false);
      navigate("/myQuestions");
      console.log(data);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <>
      {/* <div className="h_darkBG"> */}
        <Header />
        {/* <div className="h_centered"> */}
          <div className="h_outer_div">
            <div className="h_container">
              <div className="h_topic">Add Question</div>

              <form className="h_form">
                <label className="h_dropdown_topic">Topics</label>
                <DropDownList
                  value={subtopic}
                  className="h_dropdown_options"
                  data={topics}
                  onChange={(e) => setSubtopic(e.target.value)}
                />
                {/* <label className="h_dropdown_topic">Level Of Experience</label>
                <DropDownList
                  value={experience}
                  className="h_dropdown_options"
                  data={lvlOfExp}
                  onChange={(e) => setExperience(e.target.value)}
                /> */}
                <label className="h_dropdown_topic">Level Of Question</label>
                <DropDownList
                  value={level}
                  className="h_dropdown_options"
                  data={lvlOfQues}
                  onChange={(e) => setLevel(e.target.value)}
                />
                <label className="h_dropdown_topic">Type your question</label>
                <textarea
                  value={question}
                  className="h_textinput "
                  rows={4}
                  cols={40}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <label className="h_dropdown_topic">
                  Answer for the question
                </label>
                <textarea
                  value={answer}
                  className="h_textinput"
                  rows={4}
                  cols={40}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <div className="h_button_div">
                  <input
                    className="h_button"
                    type="submit"
                    value="Add"
                    onClick={submitHandler}
                  />
                </div>
              </form>
            </div>
          {/* </div> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default AddQuestion;
// http://localhost:3000/addquestion?topic=Java+EE+Frameworks&exp=1-2+YOE&lvl=Medium&ques=qwer&ans=qwer
// question, answer, experience, level, subtopic;
// http://localhost:3000/addquestion?subtopic=Java+EE+Frameworks&experience=1-2+YOE&level=Medium&question=adf&answer=asdf
