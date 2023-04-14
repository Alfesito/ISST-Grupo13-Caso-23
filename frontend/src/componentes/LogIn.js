import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import iconAvatar from "../images/iconAvatar.png"

export default function LogIn() {
  return (
    <div>
      <div class="wrapper fadeInDown">
        <div id="formContent">
          {/* Tabs Titles */}
          <h2 class="active">Inicia sesión</h2>

          {/* Icon */}
          <div class="fadeIn first">
          <img
              src={iconAvatar}
              id="icon"
              alt="imagen que queramos"
            />
          </div>

          {/* Login Form */}
          <form>
            <input
              type="text"
              id="login"
              class="fadeIn second"
              name="login"
              placeholder="Correo Electrónico"
            ></input>
            <input
              type="text"
              id="password"
              class="fadeIn third"
              name="login"
              placeholder="Contraseña"
            ></input>
            <Link to="/navbar">
              {" "}
              <input type="submit" class="fadeIn fourth" value="Inicia sesión"></input>
            </Link>
          </form>

          {/* Remind Passowrd  */}
          <div id="formFooter">
            <a class="underlineHover" href="#">
              ¿Olvidaste la contraseña?
            </a>
          </div>
        </div>
      </div>

      <Link to="/">
        <Button id="volver" variant="danger">
          {" "}
          Volver{" "}
        </Button>{" "}
      </Link>
    </div>
  );
}
