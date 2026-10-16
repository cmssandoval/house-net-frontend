import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Sidebar from '../components/Sidebar';
import CameraData from '../components/CameraData';

const Camera = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Sidebar />
          <CameraData />
        </Row>
      </Container>
    </>
  );
};

export default Camera;