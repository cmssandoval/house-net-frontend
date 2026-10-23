import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const PublicSidebar = () => {

  return (
    <Col xs={12} lg={3} xl={3} className="py-3 px-0 min-vh-lg-100 nav-list">
      <Navbar expand="lg" data-bs-theme="dark" className="align-items-start p-0 w-100">
        <Container fluid className="flex-lg-column p-0 position-sticky top-0">

          <div className="d-flex justify-content-between w-100 align-items-center ms-3 mb-lg-3">
            <h4 className="mb-0 p-3 fs-2">House Net</h4>
            <Navbar.Toggle datatype="" aria-controls="sidebarMenu" />
          </div>

          <Navbar.Collapse id="sidebarMenu" className="w-100">
            <Nav className="flex-column w-100">

              <Nav.Link className="px-4 fs-5" as={Link} to="/"                > Home </Nav.Link>
              <Nav.Link className="px-4 fs-5" as={Link} to="/register"        > Registrarse </Nav.Link>
              <Nav.Link className="px-4 fs-5" as={Link} to="/login"           > Iniciar Sesión </Nav.Link>
              <Nav.Link className="px-4 fs-5" as={Link} to="/public-resources"> Recursos Públicos </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Col >
  );
};

export default PublicSidebar;