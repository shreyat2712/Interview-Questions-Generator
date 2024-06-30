// ProfileQuestions
import React from 'react';
import ProfileQABox from './ProfileQABox';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './ProfileQuestions.css'
function ProfileQuestions(props) {
  let QAData = props.QAData;
  let qaTitle = props.qaTitle;
  const navigate = useNavigate();
  
  return (
    <>
        <div className='s_qaBox'>
          <div className='primaryBorder s_myQADiv'>
            <div className="s_myQABox">
              <div className="s_blueText">{qaTitle}</div>
            </div>
            <div className="s_questionBox">
              {QAData.map((qa, index) => (
                < ProfileQABox key={index} questionId = {qa._id} question={qa.question} answer={qa.answer.replace(/\n/g, '<br>')} />
              ))}
            </div>
          </div>
        </div>
    </>
  );
}

export default ProfileQuestions;
