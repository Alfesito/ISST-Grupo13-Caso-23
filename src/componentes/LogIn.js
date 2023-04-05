import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default function LogIn() {
  return (
    <div>
      <div class="wrapper fadeInDown">
        <div id="formContent">
          {/* Tabs Titles */}
          <h2 class="active"> Log in</h2>

          {/* Icon */}
          <div class="fadeIn first">
            <img
              src="http://danielzawadzki.com/codepen/01/icon.svg"
              id="icon"
              alt="img que queramos"
            />
          </div>

          {/* Login Form */}
          <form>
            <input
              type="text"
              id="login"
              class="fadeIn second"
              name="login"
              placeholder="login"
            ></input>
            <input
              type="text"
              id="password"
              class="fadeIn third"
              name="login"
              placeholder="password"
            ></input>
            <Link to="/navbar">
              {" "}
              <input type="submit" class="fadeIn fourth" value="Log In"></input>
            </Link>
          </form>

          {/* Remind Passowrd  */}
          <div id="formFooter">
            <a class="underlineHover" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>

      <Link to="/navbar">
        <Button id="entrar" variant="outline-success">
          {" "}
          Iniciar sesión{" "}
        </Button>{" "}
      </Link>

      <Link to="/navbar">
        <Button id="volver" variant="danger">
          {" "}
          Volver{" "}
        </Button>{" "}
      </Link>
    </div>
  );
}
