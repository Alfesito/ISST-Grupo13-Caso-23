import React from "react";
import { Link } from "react-router-dom";


function LandingPage() {
  return (
    <div>
      <div class="landing-page">
        <div class="container">
          <div class="header-area">
            <div class="logo">
              Nutri<b>App</b>
            </div>
            <ul class="links">
              <li>Home</li>
              <li>About Us</li>
              <li>Work</li>
              <li>Info</li>
              <Link to={"/login"}><li>Log in</li></Link>
              <Link to={"/signin"}><li>Sign in</li></Link>
              
            </ul>
          </div>
          <div class="info">
            <h1>LANDING PAGE</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus odit nihil ullam nesciunt quidem iste, Repellendus
              odit nihil
            </p>
            <Link to={"/navbar"}>
            <button>Ir a navbar</button>
            </Link>
          </div>
          <div class="image">
            <img src="https://i.postimg.cc/65QxYYzh/001234.png" alt=""></img>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>

      
    </div>
  );
}

export default LandingPage;
