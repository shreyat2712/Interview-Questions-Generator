// LandingPage.js
import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import FormBox from "../components/FormBox";
import Intro from "../components/Intro";
import GeneratedQABox from "../components/GeneratedQABox";
import "./LandingPage.css";

function Dashboard() {
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
              <FormBox />
            </div>
          </div>
          <div>
            <GeneratedQABox />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
