import { Outlet } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import AdminSidebar from '@/components/Admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <Container fluid>
      <Row>
        <AdminSidebar />
        <Col xs={12} lg={9} xl={9} className="p-4 px-lg-5">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLayout;