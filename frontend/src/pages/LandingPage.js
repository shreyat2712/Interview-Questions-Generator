// LandingPage.js
import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import FormBox from "../components/FormBox";
import Intro from "../components/Intro";
import GeneratedQABox from "../components/GeneratedQABox";
import "./LandingPage.css";
import Footer from "../components/Footer";

function LandingPage() {
  const defaultQA = [
    {
      question: "What is the difference between a compiler and an interpreter?",
      answer: "A compiler translates the entire source code into machine code before execution, producing an executable file, whereas an interpreter translates the source code line-by-line during execution."
    },
    {
      question: "What is the time complexity of binary search?",
      answer: "The time complexity of binary search is O(log n), where n is the number of elements in the sorted array."
    },
    {
      question: "What is the purpose of an operating system?",
      answer: "An operating system manages computer hardware and software resources, provides services for computer programs, and acts as an intermediary between users and the computer hardware."
    },
    {
      question: "What is a data structure?",
      answer: "A data structure is a way of organizing and storing data in a computer so that it can be accessed and modified efficiently. Examples include arrays, linked lists, stacks, queues, trees, and graphs."
    },
    {
      question: "What is object-oriented programming (OOP)?",
      answer: "Object-oriented programming is a programming paradigm based on the concept of \"objects\", which can contain data in the form of fields (attributes or properties), and code in the form of procedures (methods). OOP allows for the creation of modular and reusable code by emphasizing objects and their interactions."
    }
  ];

  const [QAData, setQAData] = useState(defaultQA);
  const [qaTitle, setQaTitle] = useState("Demo Questions and Answers");
  
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts. gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Itim&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Poppins"
        rel="stylesheet"
      />

      <div className="s_bodyClass">
        <div className="s_mainBody">
          <Header />
          <div className="s_container">
            {/* First column with text */}
            <div className="s_column1">
              <Intro />
            </div>
            {/* Second column with form */}
            <div className="s_column2">
            <FormBox setQAData={setQAData} setQaTitle={setQaTitle}/>
            </div>
          </div>
          <div>
              <GeneratedQABox QAData={QAData} setQAData={setQAData} qaTitle={qaTitle}/>
          </div>
          <Footer/>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
