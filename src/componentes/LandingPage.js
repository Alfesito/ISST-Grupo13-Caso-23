import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <div class="hero-image">
        <div class="hero-text">
          <h1 class="gradient-text active-gradient">Nutri<b>App</b></h1>
          <p>"Donde tu nuevo tú comienza"</p>
          <Link to={"/login"}>
          <button class="btn-default">Iniciar sesión</button>
          </Link>{"  "}
          <Link to={"/signin"}>
          <button class="btn-default">Registrarse</button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
