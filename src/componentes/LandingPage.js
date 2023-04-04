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
              
              <Link to={"/login"}><li>Log in</li></Link>
              <Link to={"/signin"}><li>Sign in</li></Link>
              
            </ul>
          </div>
          <div class="info">
            <h1>Página principal</h1>
            <h2>"Where your new you begin"</h2>

            
            <Link to={"/navbar"}>
            <button>INICIO</button>
            </Link>
          </div>
          <div class="image">
            <img src="https://st2.depositphotos.com/4431055/11871/i/600/depositphotos_118710550-stock-photo-woman-eating-apple.jpg" alt=""></img>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>

      
    </div>
  );
}

export default LandingPage;
