import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const Dashboard = () => {
  return (
    <>
      <Container className='px-1 px-lg-5 mt-3'>
        <Card className='p-4 card-custom gap-2'>
          <h2>Dashboard</h2>
          <p>Aquí encontrarás información resumida del hogar próximamente</p>
          <p>Mientras, puedes visitar otras secciones disponibles en el menú</p>
        </Card>
      </Container>
    </>
  );
};

export default Dashboard;