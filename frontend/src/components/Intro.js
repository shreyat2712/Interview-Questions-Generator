// Intro.js
import React from 'react';
import './Intro.css'; // Import CSS module
import SelfWritingText from './SelfWritingText';



function Intro() {
  return (
    <>
        <p className='s_welcomePara'>Welcome to </p>
        <div className='s_borderBottom'>
          <SelfWritingText />
        </div>
        <p className='s_introPara'>
        Introducing our Interview Question Generator – the ultimate tool for streamlining the hiring process with precision and ease, specifically designed for freshers!

Conducting interviews can be a daunting task, requiring meticulous preparation and a deep understanding of the candidate's potential. That's why we've developed the Interview Question Generator, a solution crafted to simplify the interview process while ensuring a thorough assessment of candidates' skills.

Our Interview Question Generator offers interviewers access to a comprehensive database of curated questions, meticulously tailored to cover a wide range of topics crucial for freshers. From JavaScript fundamentals and core Java concepts to object-oriented programming (OOP) and database management systems (DBMS), our generator provides questions that address the key areas relevant to your hiring needs.
        </p>
    </>
  );
}

export default Intro;
