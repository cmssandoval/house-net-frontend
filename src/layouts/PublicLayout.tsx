import { Outlet } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PublicLayout = () => {
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

export default PublicLayout;