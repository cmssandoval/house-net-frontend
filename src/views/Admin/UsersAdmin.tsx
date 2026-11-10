import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

interface FetchedData {
  id: string;
  fullName: string;
  displayName: string;
  email: string;
  status: string;
  role: string;
}

interface UsersAdminProps {
  onBack: () => void;
}

const UsersAdmin = ({ onBack }: UsersAdminProps) => {

  const [ users, setUsers ] = useState<FetchedData[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        //! USE AXIOS INSTEAD
        // const response = await fetch('/user/admin');
        // const data = await response.json();
        // setUsers(data);
        setUsers([{
          id: '0fjf-1k32-0afs-1kl3',
          fullName: 'Carlos',
          displayName: 'Carlos',
          email: 'carlos@carlos.carlos',
          status: 'active',
          role: 'admin',
        }]);
      } catch (error) {
        console.log(error);
        alert('Error al obtener los usuarios...');
      }
    };

    getData();
  }, []);

  return (
    <main className="admin-page admin-users-page">
      <header className="admin-subpage-heading">
        <Button className="admin-back-button" variant="link" onClick={onBack}>
          ← Administración
        </Button>
        <p className="eyebrow">Acceso al hogar</p>
        <h1 className="admin-page-title">Usuarios</h1>
      </header>
      <Container className="admin-content">
        <Row>
          <Card className="admin-panel-card card-custom">
            <div className="admin-panel-heading">
              <div>
                <Card.Title className="admin-panel-title">Cuentas del hogar</Card.Title>
                <p className="admin-panel-note">
                  Vista de muestra; la gestión de usuarios se conectará cuando esté disponible la API.
                </p>
              </div>
            </div>
            <Container className="admin-table-container">
              <Table responsive className="admin-table users-table mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Nombre visible</th>
              <th>Correo</th>
              <th>Estado</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map(( u ) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.fullName}</td>
                <td>{u.displayName}</td>
                <td>{u.email}</td>
                <td>{u.status}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
            </Container>
          </Card>
        </Row>
      </Container>
    </main>
  );
};

export default UsersAdmin;