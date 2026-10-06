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
          <Sidebar />
          <Col className="p-4 col-12 col-lg-9 col-xl-10">
            <div className="px-3 pb-1">
              <h2 className="mb-3 px-4 fw-bold">Dashboard</h2>

            </div>
            <Container className="px-4">
              <Row>
                <DashboardCard title="Tareas pendientes" content={tasks} />
                <DashboardCard title="Tareas pendientes" content={tasks} />
                <DashboardCard title="Tareas pendientes" content={tasks} />
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