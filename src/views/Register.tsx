import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Sidebar from "../components/Sidebar";
import RegisterForm from "../components/RegisterForm.tsx";

const Register = () => {
    return (
      <Container fluid>
        <Row>
          <Sidebar />
          <RegisterForm />
        </Row>
      </Container>
    );
};

export default Register;