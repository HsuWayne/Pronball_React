import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import "./WebNavbar.css";

const WebNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#">
          <div className="navbar-logo d-inline-block justify-content-end"></div>
          <span>乒乓棒球</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="active text-center" href="#">
              計分板
            </Nav.Link>
            <NavDropdown
              className="text-center"
              title="統計數據"
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#">本季投手數據</NavDropdown.Item>
              <NavDropdown.Item href="#">本季打者數據</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">投手生涯數據</NavDropdown.Item>
              <NavDropdown.Item href="#">打者生涯數據</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default WebNavbar;
