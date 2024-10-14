import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Container fluid>
      <Row>
        <Navbar expand="lg" bg="none" data-bs-theme="dark">
          <Container className="text-center">
            <LinkContainer to="/">
              <Navbar.Brand href="/">Mariia Al-Rammahi</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/about">
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/projects">
                  <Nav.Link>Projects</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/skills">
                  <Nav.Link>Skills</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contact">
                  <Nav.Link>Contact</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  );
};

export default Layout;
