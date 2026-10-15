import Row from "react-bootstrap/Row";
import Sidebar from "../components/Sidebar";
import Container from "react-bootstrap/Container";
import Tasks from "../components/Tasks";

const Home = () => {

  return (
    <>
      <Container fluid>
        <Row>
          <Sidebar />
          <Tasks />
        </Row>
      </Container>
    </>
  );
};

export default Home;