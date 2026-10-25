import { Outlet } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PublicSidebar from '@/components/PublicSidebar';

const PublicLayout = () => {
  return (
    <Container fluid>
      <Row>
        <PublicSidebar />
        <Col xs={12} lg={9} xl={9} className="p-4 px-lg-5">
          <Container className='px-1 px-lg-5 mt-3'>
            <Outlet />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default PublicLayout;