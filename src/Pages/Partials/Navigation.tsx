import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { NavDropdown, Image } from "react-bootstrap"; // Import the Image component

function Navigation() {
  const { currentUser, userEmail, userName, userPhotoUrl } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">
          Google Maps
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto">
            {currentUser ? (
              <>
                {/* User is logged in */}
                <Nav.Link as={NavLink} to="/Restaurants"></Nav.Link>

                <NavDropdown
                  title={
                    userPhotoUrl ? (
                      <Image
                        src="https://media.pitchfork.com/photos/636c08f28c17fa7c51b8112f/2:1/w_1920,c_limit/Snoop-Dogg-2022.jpg"
                        height={30}
                        width={30}
                        title={(userName || userEmail) ?? ""}
                        className="img-square"
                        fluid
                        roundedCircle
                      />
                    ) : (
                      userName || userEmail
                    )
                  }
                >
                  <NavDropdown.Item as={NavLink} to="/Create">
                    LÄGG TILL RESTAURANG
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/Restaurants">
                    RESTAURANGER
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/Tips">
                    TIPS
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/Loggaut">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/Loggain">
                  {" "}
                  {/* Typo correction */}
                  LOGGA IN
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
