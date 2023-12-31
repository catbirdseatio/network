import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

const Header = () => {
  const { user } = useUserContext();

  return (
    <Navbar expand="lg" className="bg-body-tertiary Header mb-2">
      <Container fluid>
        <Navbar.Brand href="/">Network</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/">
              All Posts
            </Nav.Link>
            {user.is_authenticated && (
              <Nav.Link as={NavLink} to={`/users/${user.username}`}>
                {user.username}
              </Nav.Link>
            )}
            {user.is_authenticated ? (
              <>
                <Nav.Link as={NavLink} to="/feed">
                  Following
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
