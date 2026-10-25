import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AdminPanelCard = () => {
  return (
    <Row>
      <Card className='p-2 card-custom'>
        <Card.Title className='p-2'>Admin test Card</Card.Title>
        <Form className='p-3 d-flex flex-column gap-4'>
            <Form.Group>
            <Form.Label className='fw-bold'>Label</Form.Label>
            <div className='d-flex gap-2'>
              <Form.Control
              />
              <Button>Test!</Button>
            </div>
          </Form.Group>
        </Form>
      </Card>
    </Row>
  );
};

export default AdminPanelCard;