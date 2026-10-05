import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const NotFound = () => {
  return (
    <Container fluid>
      <Row>
        <Sidebar />
        <Col className='p-4 col-sm-8 col-md-9 col-xl-10'>
          <h2 className="fw-bold ps-3 mb-4">Not Found</h2>
          <Card className='card-custom text-center gap-3 p-4 m-3'>
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