import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/Sidebar";
import Container from "react-bootstrap/Container";
import DashboardCard from '../components/DashboardCard';

const Home = () => {
  const tasks = [
    'Diseñar view de profile',
    'Diseñar view de settings',
    'Diseñar view de Casa',
  ];

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
                <DashboardCard title="Tareas pendientes" content={tasks} />
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;