import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import "./Header.scss"

const Header = () => {
  return (
    <Navbar expand="lg" bg="light"className="bg-body-tertiary Header">
      <Container fluid>
        <Navbar.Brand>Network</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
