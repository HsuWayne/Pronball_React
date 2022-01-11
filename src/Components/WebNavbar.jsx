import React, { useState } from "react";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./WebNavbar.css";

const WebNavbar = () => {
  const [dropDownActive, setDropDownActive] = useState(false);
  const checkDropDownActive = (e) => {
    if (
      e.target.pathname === "/Pronball_React/pitcher" ||
      e.target.pathname === "/Pronball_React/batter"
    ) {
      setDropDownActive(true);
    } else setDropDownActive(false);
  };
  return (
    <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
      <Container>
        <LinkContainer to="/Pronball_React/">
          <Navbar.Brand>
            <div className="navbar-logo d-inline-block justify-content-end"></div>
            <span>乒乓棒球</span>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/Pronball_React/">
              <Nav.Link className="text-center" onClick={checkDropDownActive}>
                計分板
              </Nav.Link>
            </LinkContainer>
            <NavDropdown
              className="text-center"
              title="統計數據"
              id="collasible-nav-dropdown"
              onClick={checkDropDownActive}
              active={dropDownActive}
            >
              <LinkContainer to="/Pronball_React/pitcher">
                <NavDropdown.Item>投手數據</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/Pronball_React/batter">
                <NavDropdown.Item>打者數據</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default WebNavbar;
