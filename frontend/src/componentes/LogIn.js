import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useEffect } from "react";

import iconAvatar from "../images/iconAvatar.png"

export default function LogIn() {

  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();
  const { correo } = useContext(MyContext);
  const {logInCorreo, logOutCorreo} = useContext(MyContext);

  useEffect(() => {
    logOutCorreo();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
      if (correo === "" || contraseña === "") {
        alert("Campos obligatorios nulos")
      } else if (contraseña.length < 5) {
        alert("Nombre de usuario y contraseña deben tener al menos 5 caracteres");
        return;
      } else if (!/\S+@\S+\.\S+/.test(correo)) {
        alert("Correo electrónico inválido");
        return;
      }else{
        // Aquí puedes hacer la solicitud POST al servidor con los datos del formulario
        await fetch("/login/usuario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ correo, contraseña }),
        })
          .then((response) => {
            if (response.status === 200) {
              navigate("/hoy");
            }else{
              alert("Login incorrecto")
            }
            console.log(response)
          })
          .catch((response) => {console.log(response)})
        }
      }
      const handleCorreo = (event) => {
        logInCorreo(event.target.value);
      };
      const handleContraseña = (event) => {
        setContraseña(event.target.value);
      };

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
              value={correo}
              onChange={handleCorreo}
            ></input>
            <input
              type="password"
              id="password"
              class="fadeIn third"
              name="login"
              placeholder="Contraseña"
              value={contraseña}
              onChange={handleContraseña}
            ></input>
                <input type="submit" class="fadeIn fourth" value="Inicia sesión" onClick={handleSubmit}></input>
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
      <Link to="/navbar">
        <Button id="volver" variant="danger">
          {" "}
          IR A NAVBAR{" "}
        </Button>{" "}
      </Link>
    </div>
  );
}
