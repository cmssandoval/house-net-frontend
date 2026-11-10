import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const AdminDashboard = () => {
  return (
    <main className="admin-page admin-dashboard">
      <Container className="admin-content">
        <Card className="admin-panel-card card-custom">
          <h2 className="admin-page-title">AdminDashboard</h2>
          <p>Aquí encontrarás herramientas para mantener y configurar el sistema de House Net</p>
          <p>Mientras, puedes visitar otras secciones disponibles en el menú</p>
        </Card>
      </Container>
    </main>
  );
};


export default AdminDashboard;