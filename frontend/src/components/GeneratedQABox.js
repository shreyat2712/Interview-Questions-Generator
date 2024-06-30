// QueAnsBox.js
import React, { useEffect, useState, useRef } from "react";
import "./GeneratedQABox.css";
import QueAnsBox from "./QueAnsBox";
import {} from "@fortawesome/react-fontawesome";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";
function GeneratedQABox(props) {
  const userLogged = JSON.parse(localStorage.getItem("isLoggedIn")); 
  // const isLoggedIn=useSelector(state=>state.auth)
  const isLoggedIn=useSelector(state=>state.auth.isLoggedIn)
  // const [downloadButton, setDownloadButton]=useState('false')
  // console.log(downloadButton)
  const componentPDF = useRef();
  let QAData = props.QAData;
  let qaTitle = props.qaTitle;
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: qaTitle,
  });
  // useEffect=()=>{
  //   if(userLogged)setDownloadButton(true)
  // }
  return (
    <>
      <div className="s_qaBox">
        <div className="s_blueBox">
          <div className="s_blueText">{qaTitle}</div>
          {/* {isLoggedIn ? (
            <button onClick={generatePDF} className="h_download_button">
              Download
            </button>
          ) : (
            <div></div>
          )} */}
          {isLoggedIn && <button onClick={generatePDF} className="h_download_button">Download</button>}
        </div>
        <div ref={componentPDF} style={{ width: "100%" }}>
          <div className="s_questionBox">
            {QAData.map((qa, index) => (
              <QueAnsBox
                key={index}
                question={qa.question}
                answer={qa.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneratedQABox;
