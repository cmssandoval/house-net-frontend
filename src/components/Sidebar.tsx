import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Sidebar = () => {
  const token = undefined;

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

              <Nav.Link className="px-4 fs-5" as={Link} to="/tablero"        > Dashboard </Nav.Link>
              <Nav.Link className="px-4 fs-5" as={Link} to="/inventario"     > Inventario </Nav.Link>
              <Nav.Link className="px-4 fs-5" as={Link} to="/tareas"         > Tareas </Nav.Link>
              <Nav.Link disabled className="px-4 fs-5" as={Link} to="/camara"         > Cámara </Nav.Link>
              {/* <Nav.Link className="px-4 fs-5" as={Link} to="/tareas"    > Tareas </Nav.Link> */}
              {/* <Nav.Link className="px-4 fs-5" as={Link} to="/proyectos" > Proyectos </Nav.Link> */}
              {/* <Nav.Link className="px-4 fs-5" as={Link} to="/recursos"  > Recursos </Nav.Link> */}
              {/* <Nav.Link className="px-4 fs-5" as={Link} to="/metas"     > Metas </Nav.Link> */}
              {/* <Nav.Link className="px-4 fs-5" as={Link} to="/notas"     > Notas </Nav.Link> */}
              {/* <Nav.Link className="px-4 fs-5" as={Link} to="/ajustes"   > Ajustes </Nav.Link> */}

              {!token && <Nav.Link className="text-danger fw-bold px-4 fs-5" as={Link} to="/logout"   > Logout </Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Col >
  );
};

export default Sidebar;