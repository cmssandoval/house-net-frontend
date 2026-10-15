import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TaskCard from './TaskCard';

const Tasks = () => {
  const tasks = [
    'Diseñar view de profile',
    'Diseñar view de settings',
    'Diseñar view de Casa',
  ];

  return (
    <Col sm={12} lg={9} xl={10} className="p-4">
      <div className="px-3 pb-1">
        <h2 className="mb-3 px-4 fw-bold">Dashboard</h2>

      </div>
      <Container className="px-2">
        <Row>
          <TaskCard title="Tareas pendientes" content={tasks} />
          <TaskCard title="Tareas pendientes" content={tasks} />
          <TaskCard title="Tareas pendientes" content={tasks} />
          <TaskCard title="Tareas pendientes" content={tasks} />
        </Row>
      </Container>
    </Col>
  );
};

export default Tasks;