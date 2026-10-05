import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/Sidebar";
import Container from "react-bootstrap/Container";
import CustomCard from '../components/CustomCard';

const Home = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col className="p-0 col-sm-4 col-md-3 col-xl-2">
            <Sidebar />
          </Col>
          <Col className="p-4 col-sm-8 col-md-9 col-xl-10">
            <h2 className="fw-bold ps-3 mb-4">Dashboard</h2>
            <Container>
              <Row>
                <CustomCard />
                <CustomCard />
                <CustomCard />
                <CustomCard />
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;