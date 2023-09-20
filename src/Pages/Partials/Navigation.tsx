import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">
          Google Maps
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={NavLink} to="/Create">
              LÄGG TILL RESTAURANG
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Restaurants">
              RESTAURANGER
            </Nav.Link>
            <Nav.Link as={NavLink} to="/tips">
              TIPS
            </Nav.Link>

            <Nav.Link as={NavLink} to="/Loggin">
              LOGGA IN
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
