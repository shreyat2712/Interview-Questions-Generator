import React, { useState, useEffect } from "react";
import "./MyQuestions.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfileQuestions from "../components/ProfileQuestions";
import Header from "../components/Header";

const MyQuestions = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [QAData, setQAData] = useState([]);
  const [qaTitle, setQaTitle] = useState("My Questions");
  const navigate = useNavigate();

  useEffect(() => {
    const userLogged = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (!userLogged) {
      navigate("/");
    } else {
      const fetchData = async () => {
        try {
          const userinfoString = localStorage.getItem("userInfo");
          const userinfo = JSON.parse(userinfoString);
          const storedToken = userinfo.token;

          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          const { data } = await axios.get(
            "/getAllUserQuestions",
            {}
          );

          setLoading(false);
          console.log(data);
          if (data.Questions.length > 0) {
            setQAData(data.Questions)
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, []); // Add navigate to dependency array to avoid warnings

  return (
    <div className="s_darkBG">
      <Header/>
      <div className="solidBorder">
        <ProfileQuestions QAData={QAData} setQAData={setQAData} qaTitle={qaTitle} />
      </div>
    </div>
  );
};

export default MyQuestions;
