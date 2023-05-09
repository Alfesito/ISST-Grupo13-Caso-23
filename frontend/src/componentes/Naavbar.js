import * as React from "react";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Header from "./Header";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";

import { Link } from "react-router-dom";

function Naavbar() {

  const {logOutCorreo} = useContext(MyContext);

  function logOut(){
    logOutCorreo();
  }
   
  return (
    <>
      <Header />
      <Navbar bg="light" expand="lg">
        <Container fluid className="navbar-container">
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="NavBarcss"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/hoy">
                Hoy
              </Nav.Link>
              <Nav.Link as={Link} to="/alimentacion">
                Alimentación
              </Nav.Link>
              <Nav.Link as={Link} to="/historial">
                Historial
              </Nav.Link>
              <Nav.Link as={Link} to="/recomendaciones">
                Recomendaciones
              </Nav.Link>
            </Nav>

            <div class="buttons">
              <Link to="/perfil" className="button perfil-button">
                Perfil
              </Link>
              <Link to="/" className="button salir-button" onClick={logOut}>
                Salir
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Naavbar;