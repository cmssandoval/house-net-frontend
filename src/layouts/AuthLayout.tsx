import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet } from 'react-router-dom';
const AuthLayout = () => {
  return (
    <Container fluid>
      <Row>
        <Col className="p-4 px-lg-5">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AuthLayout;