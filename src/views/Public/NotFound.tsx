import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NotFound = () => {
  return (
    <Container fluid>
      <Row className='justify-content-center'>
        <Col xs={12} lg={10} className='p-4 px-lg-5'>
          <Container className='px-1 my-4'>
            <h2 className="p-2 fw-bold">Not Found</h2>

            <Card className='p-4 my-4 card-custom text-center gap-3'>
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
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;