import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import TaskCard from '@/components/TaskCard.tsx';

const Tasks = () => {
  const tasks = [
    'Diseñar view de profile',
    'Diseñar view de settings',
    'Diseñar view de Casa',
  ];

  return (
    <>
      <div className="px-3 pb-1">
        <h2 className="mb-3 px-4 fw-bold">Tareas</h2>

      </div>
      <Container className="px-2">
        <Row>
          <TaskCard title="Tareas pendientes" content={tasks} />
          <TaskCard title="Tareas pendientes" content={tasks} />
          <TaskCard title="Tareas pendientes" content={tasks} />
          <TaskCard title="Tareas pendientes" content={tasks} />
        </Row>
      </Container>
    </>
  );
};

export default Tasks;