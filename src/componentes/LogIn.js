import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default function LogIn() {
  return (
    <div>
      
      <h1>Introduzca sus credenciales</h1>

      <div id="user">
       User: <Form className="form-inline">
          <input
            type="text"
            placeholder="Escriba su usuario"
            id="filtro"
            //onChange={handleInputChange}
          ></input>
        </Form>
      </div>

      <div id="password">
       Password: <Form className="form-inline">
          <input
            type="text"
            placeholder="Escriba su contraseña"
            id="filtro"
            //onChange={handleInputChange}
          ></input>
        </Form>

      <div>
        <Link to="/navbar">
        <Button id="entrar" variant="outline-success"> Iniciar sesión </Button> </Link>
      </div>

  </div>


  <Link to="/navbar">
        <Button id="volver" variant="danger"> Volver </Button> </Link>
    </div>
  );
}
