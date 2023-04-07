import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";

import NavDropdown from "react-bootstrap/NavDropdown";

export default function SignIn() {
  
  const {setAlergia}= useContext(MyContext);
  const handleInputChange= (e)=>{
    setAlergia(e)
  }

  return (
    <div>
      <div class="wrapper fadeInDown">
        <div id="formContent">
          {/* Tabs Titles */}
          <h2 class="active"> Sign in</h2>

          {/* Icon */}
          <div class="fadeIn first">
            <img
              src="http://danielzawadzki.com/codepen/01/icon.svg"
              id="icon"
              alt="imagen que queramos"
            />
          </div>

          {/* Sign Form */}
          <form>
            <input
              type="text"
              id="username"
              class="fadeIn second"
              placeholder="Escriba su nombre de usuario"
            ></input>
            <input
              type="text"
              id="password"
              class="fadeIn third"
              placeholder="Escriba su contraseña"
            ></input>
            <input
              type="text"
              id="repassword"
              class="fadeIn third"
              placeholder="Repita su contraseña"
            ></input>
            <input
              type="text"
              id="limcal"
              class="fadeIn fourth"
              placeholder="Introduzca el limite calórico diario?"
            ></input>
            <input
              type="text"
              id="alergias"
              class="fadeIn fifth"
              placeholder="Introduzca su alergia"
              onChange={(e)=>handleInputChange(e.target.value)}
            ></input>
            {/* Dropdown */}
            <div class="fadeIn sixth">
              <Button id="desplegable" variant="success">
                <NavDropdown
                  title="Elige su dieta favorita"
                  id="navbarScrollingDropdown"
                >
                  <Dropdown.Item as="button">China</Dropdown.Item>
                  <Dropdown.Item as="button">Italiana</Dropdown.Item>
                  <Dropdown.Item as="button">Americana</Dropdown.Item>
                  <Dropdown.Item as="button">Libanesa</Dropdown.Item>
                  <Dropdown.Item as="button">Francesa</Dropdown.Item>
                </NavDropdown>
              </Button>
            </div>

            <Link to="/navbar">
              <input type="submit" class="fadeIn x" value="Sign In"></input>
            </Link>
          </form>

          {/* Remind Passowrd  */}
          <div id="formFooter">
            <lergia class="underlineHover" href="#">
              Forgot Password?
            </lergia>
          </div>
        </div>
      </div>
      <div>
        <Link to="/navbar">
          <Button id="volver" variant="danger">
            {" "}
            Volver{" "}
          </Button>{" "}
        </Link>
      </div>
    </div>
  );
}
