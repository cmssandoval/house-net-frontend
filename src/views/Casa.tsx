import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Sidebar from '../components/Sidebar';
import Inventory from '../components/Inventory';

const Casa = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Sidebar />
          <Inventory />
        </Row>
      </Container>
    </>
  );
};

export default Casa;