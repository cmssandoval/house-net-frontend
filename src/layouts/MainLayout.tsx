import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
const MainLayout = () => {
  return (
    <Container fluid>
      <Row>
        <Sidebar />
        <Col xs={12} lg={9} xl={9} className="p-4 px-lg-5">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default MainLayout;