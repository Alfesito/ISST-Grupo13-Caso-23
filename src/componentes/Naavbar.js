import * as React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";


import { Link } from "react-router-dom";

function Naavbar() {
  

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/navbar">Hoy</Nav.Link>
              <Nav.Link href="/alimentacion">Alimentación</Nav.Link>
              <Nav.Link href="/navbar">Historial</Nav.Link>
              <Nav.Link href="/recomendaciones">Recomendaciones</Nav.Link>

              <NavDropdown title="Créditos" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/prueba">Ana Clara</NavDropdown.Item>
                <NavDropdown.Item href="/prueba">Fernando</NavDropdown.Item>
                <NavDropdown.Item href="/prueba">Andrés</NavDropdown.Item>
                <NavDropdown.Item href="/prueba">Alberto</NavDropdown.Item>
                <NavDropdown.Item href="/prueba">Guillermo</NavDropdown.Item>
              </NavDropdown>
            </Nav>

          

            <div class="buttons">
              <button  onClick={() => window.location.href="/perfil"}>Perfil</button>
              <button onClick={() => window.location.href="/login"}>Salir</button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Link to="/">
          <Button id="volver" variant="info">
            {" "}
            Página Principal{" "}
          </Button>{" "}
        </Link>
      </div>
    </>
  );
}

export default Naavbar;
