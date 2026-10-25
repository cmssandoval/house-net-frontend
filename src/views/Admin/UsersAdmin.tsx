import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

interface FetchedData {
  id: string;
  fullName: string;
  displayName: string;
  email: string;
  status: string;
  role: string;
}

const UsersAdmin = () => {

  const [ users, setUsers ] = useState<FetchedData[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        // const response = await fetch('/api/user/admin');
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
    <>
      <h2 className="ps-2 fw-bold d-inline">Inventory Admin</h2>
      <Container className='my-4'>
        <Row>
          <Card className='p-2 card-custom'>
            <div className='mx-2 mt-3 d-flex align-items-center'>
              <Card.Title className='p-2 d-inline'>Manejo de usuarios</Card.Title>
            </div>
            <Container>
              <Table responsive className='text-center'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Display Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
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
    </>
  );
};

export default UsersAdmin;