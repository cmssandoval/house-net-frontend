import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const AdminDashboard = () => {
  return (
    <>
      <Container className='px-1 px-lg-5 mt-3'>
        <Card className='p-4 card-custom gap-2'>
          <h2>AdminDashboard</h2>
          <p>Aquí encontrarás herramientas para mantener y configurar el sistema de House Net</p>
          <p>Mientras, puedes visitar otras secciones disponibles en el menú</p>
        </Card>
      </Container>
    </>
  );
};


export default AdminDashboard;