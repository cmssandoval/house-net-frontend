import AdminPanelCard from '@/components/Admin/AdminPanelCard';
import Container from 'react-bootstrap/Container';

const AdminDashboard = () => {
  return (
    <>
      <h2 className="ps-2 fw-bold d-inline">Admin Panel</h2>
      <Container className='my-4'>
        <AdminPanelCard />
      </Container>
    </>
  );
};

export default AdminDashboard;