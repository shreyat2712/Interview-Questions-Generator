import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./AddQuestion.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditQuestion = () => {
  const navigate = useNavigate();
  const userLogged = JSON.parse(localStorage.getItem("isLoggedIn"));

  useEffect(() => {
    if (!userLogged) {
      navigate("/");
    }
  }, [navigate, userLogged]);

  const location = useLocation();
  const { questionId, prvQuestion, prvAnswer } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState(prvQuestion || "");
  const [answer, setAnswer] = useState(prvAnswer || "");
  const [token, setToken] = useState("");

  useEffect(() => {
    const userinfoString = localStorage.getItem("userInfo");
    if (userinfoString) {
      const userinfo = JSON.parse(userinfoString);
      const storedToken = userinfo.token;

      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!question || !answer) {
      console.log("Please fill topic");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      };
      const { data } = await axios.patch(
        "/updateQuestion",
        { questionId, question, answer },
        config
      );
      setLoading(false);
      navigate("/myQuestions");
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="h_darkBG">
      <div className="h_centered">
        <div className="h_outer_div">
          <div className="h_container">
            <div className="h_topic">Edit Question</div>

            <form className="h_form" onSubmit={submitHandler}>
              <label className="h_dropdown_topic">Update your question</label>
              <textarea
                value={question}
                className="h_textinput "
                rows={4}
                cols={40}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <label className="h_dropdown_topic">
                Updated Answer
              </label>
              <textarea
                value={answer}
                className="h_textinput"
                rows={4}
                cols={40}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <div className="h_button_div">
                <button className="h_button" type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
