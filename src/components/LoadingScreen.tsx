import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

const LoadingScreen = () => {
  return (
    <Container className='px-1 my-4'>
      <Card className='p-4 my-4 card-custom gap-3'>
        <div className='d-flex justify-content-center'>
            <h3>Cargando...</h3>
            <Spinner />
        </div>
      </Card>
    </Container>
  );
};

export default LoadingScreen;