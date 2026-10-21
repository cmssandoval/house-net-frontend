import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
const CameraData = () => {

  return (
    <Col sm={12} lg={9} xl={10} className="p-4">
      <div className="px-3 pb-1">
        <h2 className="mb-3 px-4 fw-bold">Camara</h2>
      </div>
      <Container className="px-2">
        <Row>
          <Card className='p-2 card-custom'>
            <img src="/api/camera/stream/" alt="Stream V4L2" />
          </Card>
        </Row>
      </Container>
    </Col>
  );
};

export default CameraData;