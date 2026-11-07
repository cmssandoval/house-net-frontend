import '@/../env.d.ts';

import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { useAuth } from "@/contexts/AuthContext.ts";
import appRoutes from "@/config/appRoutes";

const Sidebar = () => {

  const { role, logout } = useAuth();
  const allowedRoutes = appRoutes.filter(r => r.roles.includes(role));

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
              {allowedRoutes.map(( route ) => (
                <Nav.Link
                  className="px-4 fs-5"
                  as={Link}
                  key={route.path}
                  to={route.path}
                  disabled={route.disabled}
                >
                  {route.label} 
                </Nav.Link>  
              ))}
              {role !== 'guest' && <Nav.Link className="text-danger fw-bold px-4 fs-5" onClick={logout}> Logout </Nav.Link>}
            </Nav>
            <div className="d-flex fixed-bottom justify-content-between w-100 align-items-center m-lg-3 m-xl-4">
              <small className="d-block text-secondary"
              > build {__BUILD__}
              </small>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Col >
  );
};

export default Sidebar;