import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link } from 'react-router-dom';

function Naavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
      <Link to={"/searchpage"}>
      <Navbar.Brand>Volver a lo de antes</Navbar.Brand>
      </Link>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/navbar">Hoy</Nav.Link>
            <Nav.Link  href="/navbar">Alimentación</Nav.Link>
            <Nav.Link  href="/navbar">Historial</Nav.Link>
            <Nav.Link  href="/navbar">Recomendaciones</Nav.Link>

            <NavDropdown title="Agradecimientos" id="navbarScrollingDropdown">
              <NavDropdown.Item  href="/prueba">Ana</NavDropdown.Item>
              <NavDropdown.Item  href="/prueba">Fer</NavDropdown.Item>
              <NavDropdown.Item  href="/prueba">Alfesito</NavDropdown.Item>
              <NavDropdown.Item  href="/prueba">Alberto</NavDropdown.Item>
              <NavDropdown.Item  href="/prueba">Guille</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://www.youtube.com/watch?v=_T20N4Sqcss">
                Fernando alonso, este finde 33
              </NavDropdown.Item>
            </NavDropdown>
           
          </Nav>
        <Link to ={ "/prueba"}>
        <Button variant="outline-success">Perfil</Button>
        </Link>
        <Link to ={ "/prueba"}>
        <Button variant="outline-danger">Cerrar Sesión</Button>
        </Link>

       
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Naavbar;