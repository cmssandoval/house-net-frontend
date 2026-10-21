import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <h2 className="mb-4 pb-2 px-3 fw-bold">Not Found</h2>

      <Card className='card-custom text-center gap-3 p-4'>
        <Card.Title className='fw-bold'>Error 404</Card.Title>

        <Card.Text className='fw-bold'>No se ha encontrado la página que buscabas</Card.Text>
        <Link
          className='text-white text-decoration-none mx-auto'
          to='/'
        >
          <Button
            variant='dark'
            className='px-4'
          >Volver al inicio</Button>
        </Link>
      </Card>
    </>
  );
};

export default NotFound;