import AdminPanel from '@/components/Admin/AdminPanel';
import Container from 'react-bootstrap/Container';

const Admin = () => {
  return (
    <>
      <h2 className="fw-bold d-inline">Admin Panel</h2>
      <Container className='my-4'>
        <AdminPanel />
      </Container>
    </>
  );
};

export default Admin;