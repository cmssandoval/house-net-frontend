import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className='not-found-component' fluid>
      <Row>
        <Col className='p-5'>
          <Card className='text-center gap-3 py-5'>
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
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;