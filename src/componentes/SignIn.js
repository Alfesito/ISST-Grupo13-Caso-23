import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



export default function SignIn() {
  

  return (
    <div>
      
      <h1>¡Regístrate!</h1>

      <div id="user">
       <b>Username: </b>
        <Form className="form-inline">
          <input
            type="text"
            placeholder="Escriba su futuro nombre de usuario"
            id="filtro"
            //onChange={handleInputChange}
          ></input>
        </Form>
      </div>

      <div id="password">
       <b>Crea una contraseña</b>
       <Form className="form-inline"> 
          <input
            type="text"
            placeholder="Escriba su futura contraseña"
            id="filtro"
            //onChange={handleInputChange}
          ></input>
        </Form>
      </div>

      <div id="repeatPassword">
      <b> Repita su contraseña: </b>
       <Form className="form-inline">
          <input
            type="text"
            placeholder="Repita la contraseña del campo anterior"
            id="filtro"
            //onChange={handleInputChange}
          ></input>
        </Form>
      </div>

      <div id="kcal">
       <b>Introduzca su límite calórico: </b>
       <Form className="form-inline">
          <input
            type="text"
            placeholder="..."
            id="filtro"
            //onChange={handleInputChange}
          ></input>
        </Form>
      </div>

      <b>Elige una opción en el desplegable: </b>
      
      <Button id="desplegable" variant="success">
      <NavDropdown title="Elige tu dieta favorita" id="navbarScrollingDropdown">
      
      <Dropdown.Item as="button">China</Dropdown.Item>
      <Dropdown.Item as="button">Italiana</Dropdown.Item>
      <Dropdown.Item as="button">Americana</Dropdown.Item>
      <Dropdown.Item as="button">Libanesa</Dropdown.Item>
      <Dropdown.Item as="button">Francesa</Dropdown.Item>
      
      </NavDropdown> 
      </Button>



      <div>
      <Link to="/navbar">
        <Button id="volver" variant="danger"> Volver </Button> </Link>
      </div>
   
    </div>

    
  );
}
