import React from 'react';
import './ProfileQABox.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';

function ProfileQABox(props) {
  const { question, answer, questionId } = props;
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const onEditClick = async () => {
    navigate("/editquestion", {state: {questionId, prvQuestion: question, prvAnswer: answer}});
  };

  const onDeleteClick = async (e) => {
    e.preventDefault();
      try {
        const userinfoString = localStorage.getItem("userInfo");
        const userinfo = JSON.parse(userinfoString);
        const storedToken = userinfo.token;
  
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        const { data } = await axios.delete(
          `/deleteQuestion/${questionId}`,
        );
        navigate('/myQuestions')
        window.location.reload();
        console.log("refresh")
        dispatch(authActions.login())
        console.log("after Refresh")
        // dispatch(authActions.login({isLoggedIn:true}))

      } catch (error) {
        console.log(error);
      }
  };

  return (
    <>
      <div className="s_myQAContainer">
        <div className="s_myQAquestions">{question}</div>
        <div className="s_myQAanswers" dangerouslySetInnerHTML={{ __html: answer }}/>
        <div className='s_myQAButtons'>
          <button className='s_myQAButtonsED' onClick={onEditClick}>Edit</button>
          <button className='s_myQAButtonsED' onClick={onDeleteClick}>Delete</button>
        </div>
      </div>
    </>
  );
}

export default ProfileQABox;
