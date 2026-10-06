import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Sidebar = () => {
  return (
    <Col xs={12} lg={3} xl={2} className="p-3 min-vh-lg-100 nav-list ">
      <Navbar expand="lg" data-bs-theme="dark" className="align-items-start p-0 w-100">
        <Container fluid className="flex-lg-column p-0 position-sticky top-0">

          <div className="d-flex justify-content-between w-100 align-items-center ms-3 mb-lg-4">
            <h4 className="mb-0">House Net</h4>
            <Navbar.Toggle datatype="" aria-controls="sidebarMenu" />
          </div>

          <Navbar.Collapse id="sidebarMenu" className="w-100">
            <Nav className="flex-column w-100">

              <Nav.Link className="py-2" as={Link} to="/"          > Dashboard </Nav.Link>
              <Nav.Link className="py-2" as={Link} to="/casa"      > Casa </Nav.Link>
              <Nav.Link className="py-2" as={Link} to="/tareas"    > Tareas </Nav.Link>
              <Nav.Link className="py-2" as={Link} to="/proyectos" > Proyectos </Nav.Link>
              <Nav.Link className="py-2" as={Link} to="/recursos"  > Recursos </Nav.Link>
              <Nav.Link className="py-2" as={Link} to="/metas"     > Metas </Nav.Link>
              <Nav.Link className="py-2" as={Link} to="/notas"     > Notas </Nav.Link>
              <Nav.Link className="py-2" as={Link} to="/ajustes"   > Ajustes </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Col >
  );
};

export default Sidebar;