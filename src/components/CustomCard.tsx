import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

const CustomCard = ({
  title = 'Tareas pendientes',
  content = ['Tarea 1', 'Tarea 2']
}) => {
  return (
    <Col className="mt-4 col-xl-4 col-md-6">
      <Card className="card-custom p-3">
        <Card.Title className="fw-bold text-center">{title}</Card.Title>
        <ListGroup className="list-group-flush">
          {content.map( (item, index ) => (
            <ListGroupItem key={index}>{item}</ListGroupItem>
          ))}
        </ListGroup>
      </Card>
    </Col>
  );
};

export default CustomCard;