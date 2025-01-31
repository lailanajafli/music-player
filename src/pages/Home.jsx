// Home.js

import React from "react";
import headphone from "../assets/images/headphones.png";
import layout from "../assets/images/group21.png";
import arrow from "../assets/images/Vector.png";
import { useNavigate } from "react-router-dom";



const Home = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/playlist"); // Navigate to the playlist page
  };
  return (
    <div className="home-container">
      <img src={layout} alt="Headphones" className="layout" />
      <div className="content">
        <img src={headphone} alt="Headphones" className="headphones-img" />
        <h1>Getting started</h1>
        <p className="subtext">Getting started Getting</p>
        <button className="action-button" onClick={handleClick}>
          Let's go <span className="arrow-icon"><img src={arrow} alt="" /></span>
        </button>
      </div>
    </div>
  );
};

export default Home;
