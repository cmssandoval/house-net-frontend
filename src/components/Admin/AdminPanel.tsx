import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AdminPanel = () => {
  return (
    <Row>
      <Card className='p-2 card-custom'>
        <Card.Title className='p-2'>Manejo de tablas</Card.Title>
        <Form className='p-3 d-flex flex-column gap-4'>
          <Form.Group>
            <Form.Label className='fw-bold'>Insertar Categorías</Form.Label>
            <div className='d-flex gap-2'>
              <Form.Control
              />
              <Button>Insertar</Button>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label className='fw-bold'>Insertar Ubicaciones</Form.Label>
            <div className='d-flex gap-2'>
              <Form.Control
              />
              <Button>Insertar</Button>
            </div>
          </Form.Group>
        </Form>
      </Card>
    </Row>
  );
};

export default AdminPanel;