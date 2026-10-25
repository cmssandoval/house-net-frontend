import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const InventoryAdmin = () => {
  return (
    <>
      <h2 className="ps-2 fw-bold d-inline">Inventory Admin</h2>
      <Container className='my-4'>
        <Row>
          <Card className='p-2 card-custom'>
            <Card.Title className='p-2'>Manejo de tablas</Card.Title>
            <Form className='p-3 d-flex flex-column gap-4'>
              <Form.Group>
                <Form.Label className='fw-bold'></Form.Label>
                <div className='d-flex gap-2'>
                  <Form.Control
                  />
                  <Button></Button>
                </div>
              </Form.Group>
            </Form>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default InventoryAdmin;