// QueAnsBox.js
import React from 'react';
import './QueAnsBox.css'; // Import CSS module

function QueAnsBox(props) {
  const { question, answer } = props;

  return (
    <>
      <div className="s_queAnsBox">
        <div className="s_questions">{question}</div>
        <div className="s_answers" dangerouslySetInnerHTML={{ __html: answer }}/>
      </div>
    </>
  );
}

export default QueAnsBox;
