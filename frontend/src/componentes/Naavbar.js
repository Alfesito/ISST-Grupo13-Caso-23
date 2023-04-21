import * as React from "react";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Header from "./Header";

import { Link } from "react-router-dom";

function Naavbar() {

  function logout(){
    sessionStorage.removeItem('correo');
    console.log("onclick");
  }
   
  return (
    <>
      <Header />
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
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

              <NavDropdown title="Créditos" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/prueba">Ana Clara</NavDropdown.Item>
                <NavDropdown.Item href="/prueba">Fernando</NavDropdown.Item>
                <NavDropdown.Item href="/prueba">Andrés</NavDropdown.Item>
                <NavDropdown.Item href="/prueba">Alberto</NavDropdown.Item>
                <NavDropdown.Item href="/prueba">Guillermo</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <div class="buttons">
              <Link to="/perfil" className="button">
                Perfil
              </Link>
              <Link to="/" className="button" onClick={logout}>
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
