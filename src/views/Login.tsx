import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Sidebar from "../components/Sidebar.tsx";
import LoginForm from "../components/LoginForm.tsx";

const Login = () => {
    return (
      <Container fluid>
        <Row>
          <Sidebar />
          <LoginForm />
        </Row>
      </Container>
    );
};

export default Login;