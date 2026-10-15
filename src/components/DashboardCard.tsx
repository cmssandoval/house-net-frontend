import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

const DashboardCard = ({
  title = 'Tareas pendientes',
  content = ['Tarea 1', 'Tarea 2']
}) => {
  return (
    <Col sm={12} md={6} xl={4} className="p-0">
      <Card className="card-custom p-4 m-2">
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

export default DashboardCard;