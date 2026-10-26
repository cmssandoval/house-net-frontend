import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { Badge, Table } from 'react-bootstrap';

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
        const catResponse = await fetch('/api/inventory/categories');
        const catData = await catResponse.json();
        setCategories(catData);

        const locResponse = await fetch('/api/inventory/locations');
        const locData = await locResponse.json();
        setLocations(locData);
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
      const response = await fetch(`/api/inventory/${route}${deleteNameParam}`, {
        method: action,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      handleCleanup();
    }
  };

  return (
    <>
      <h2 className="ps-2 fw-bold d-inline">Inventory Admin</h2>
      <Container className='my-4'>
        <Row>
          <Card className='p-2 card-custom'>
            <div className='mx-2 mt-3 d-flex align-items-center'>
              <Card.Title className='p-2 d-inline'>Manejo de tablas</Card.Title>
              <div className='ms-auto'>
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
            <Form id='inventoryAdminForm' onSubmit={handleSubmit} className='p-3 d-flex flex-column gap-4'>
              <Form.Group>
                <Form.Label className='fw-bold'>+/- Category</Form.Label>
                <div className='d-flex gap-2'>
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
              <Form.Group>
                <Form.Label className='fw-bold'>+/- Location</Form.Label>
                <div className='d-flex gap-2'>
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
            <Container>
              <Table responsive className='text-center'>
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
    </>
  );
};

export default InventoryAdmin;