import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { Badge, Table } from 'react-bootstrap';
import apiClient from '@/config/axiosConfig';

interface FetchedData {
  id: string;
  name: string;
}

const InventoryAdmin = () => {

  const [ action, setAction ]     = useState('');
  const [ category, setCategory ] = useState('');
  const [ location, setLocation ] = useState('');
  
  const [ categories, setCategories ] = useState<FetchedData[]>([]);
  const [ locations, setLocations ] = useState<FetchedData[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const catResponse = await apiClient.get('/inventory/categories');
        setCategories(catResponse.data);

        const locResponse = await apiClient.get('/inventory/locations');
        setLocations(locResponse.data);
      } catch (error) {
        console.log(error);
        alert('Error al obtener las categorías o ubicaciones...');
      }
    };

    getData();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(event.target.value);
    if (!category && !location ) setAction('');
  };

  const handleActionChange = ( actionArgument: string) => {
    if (!category && !location ) return;
    setAction(actionArgument);
    console.log(category);    
  };

  const handleCleanup = () => {
    setAction('');
    setCategory('');
    setLocation('');
  };

  const handleSubmit = async ( event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!category && !location ) return handleCleanup();

    const data = { tableData: category ? category : location };
    const route = category ? 'categories' : 'locations';
    const deleteNameParam = action === 'DELETE' ? `/${data.tableData}` : '';

    try {
      const response = await apiClient.post(`/inventory/${route}${deleteNameParam}`, data);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      handleCleanup();
    }
  };

  return (
    <main className="admin-page admin-inventory-page">
      <h2 className="admin-page-title">Inventory Admin</h2>
      <Container className="admin-content">
        <Row>
          <Card className="admin-panel-card card-custom">
            <div className="admin-panel-heading">
              <Card.Title className="admin-panel-title">Manejo de tablas</Card.Title>
              <div className="admin-panel-actions">
                <Badge
                  className={'mx-2 p-2 ' + (action === 'DELETE' ? 'bg-danger' : 'bg-success')}
                >{( category || location ) ? action : ''}</Badge>
                <Button form='inventoryAdminForm' type='submit' className='me-2'
                  disabled={
                    ((!category || !location) && !action)
                  }
                >SEND</Button>
              </div>
            </div>
            <Form id='inventoryAdminForm' onSubmit={handleSubmit} className="admin-management-form">
              <Form.Group className="admin-management-group">
                <Form.Label className='fw-bold'>+/- Category</Form.Label>
                <div className="admin-management-controls">
                  <Form.Control
                  value={category}
                  disabled={location ? true : false}
                  onChange={(e) => handleChange(e, setCategory)}
                  />
                  <Button
                    onClick={() => handleActionChange('POST')}
                    variant='success'
                    disabled={!category ? true : false}  
                  >POST</Button>
                  <Button
                    onClick={() => handleActionChange('DELETE')}
                    variant='danger'
                    disabled={!category ? true : false}  
                  >DELETE</Button>
                  <Button
                    variant='dark'
                    onClick={() => handleCleanup()}
                  >🗑️</Button>
                </div>
              </Form.Group>
              <Form.Group className="admin-management-group">
                <Form.Label className='fw-bold'>+/- Location</Form.Label>
                <div className="admin-management-controls">
                  <Form.Control
                  value={location}
                  disabled={category ? true : false}
                  onChange={(e) => handleChange(e, setLocation)}
                  />
                  <Button
                    onClick={() => handleActionChange('POST')}
                    variant='success'
                    disabled={!location ? true : false}  
                  >POST</Button>
                  <Button
                    onClick={() => handleActionChange('DELETE')}
                    variant='danger'
                    disabled={!location ? true : false}  
                  >DELETE</Button>
                  <Button
                    variant='dark'
                    onClick={() => handleCleanup()}
                  >🗑️</Button>
                </div>
              </Form.Group>
            </Form>
            <Container className="admin-table-container">
              <Table responsive className="admin-table categories-table mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(( cat ) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>Category</td>
                <td>{cat.name}</td>
              </tr>
            ))}
            {locations.map(( loc ) => (
              <tr key={loc.id}>
                <td>{loc.id}</td>
                <td>Location</td>
                <td>{loc.name}</td>
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

export default InventoryAdmin;