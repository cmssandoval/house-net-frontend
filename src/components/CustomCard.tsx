import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const CustomCard = () => {
  return (
    <Col className="mt-4 col-xl-4 col-md-6">
      <Card className="card-custom p-3">
        <Card.Title className="fw-bold">Tareas pendientes</Card.Title>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Ejemplo: Terminar módulo UI</li>
          <li className="list-group-item">Ejemplo: Crear base de datos</li>
        </ul>
      </Card>
    </Col>
  );
};

export default CustomCard;