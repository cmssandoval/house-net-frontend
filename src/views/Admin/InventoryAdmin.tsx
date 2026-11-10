import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useCallback } from 'react';
import { Badge, Table } from 'react-bootstrap';
import apiClient from '@/config/axiosConfig';

interface FetchedData {
  id: number;
  name: string;
}

interface InventoryAdminProps {
  onBack: () => void;
}

const fetchInventoryTables = async () => {
  const [categoriesResponse, locationsResponse] = await Promise.all([
    apiClient.get<FetchedData[]>('/inventory/categories'),
    apiClient.get<FetchedData[]>('/inventory/locations'),
  ]);
  return {
    categories: categoriesResponse.data,
    locations: locationsResponse.data,
  };
};

const InventoryAdmin = ({ onBack }: InventoryAdminProps) => {

  const [ action, setAction ]     = useState<'POST' | 'DELETE' | ''>('');
  const [ category, setCategory ] = useState('');
  const [ location, setLocation ] = useState('');
  
  const [ categories, setCategories ] = useState<FetchedData[]>([]);
  const [ locations, setLocations ] = useState<FetchedData[]>([]);

  const loadTables = useCallback(async () => {
    try {
      const tables = await fetchInventoryTables();
      setCategories(tables.categories);
      setLocations(tables.locations);
    } catch (error) {
      console.error(error);
      alert('Error al obtener las categorías o ubicaciones...');
    }
  }, []);

  useEffect(() => {
    let active = true;

    fetchInventoryTables()
      .then((tables) => {
        if (active) {
          setCategories(tables.categories);
          setLocations(tables.locations);
        }
      })
      .catch((error: unknown) => {
        if (active) {
          console.error(error);
          alert('Error al obtener las categorías o ubicaciones...');
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(event.target.value);
    setAction('');
  };

  const handleActionChange = ( actionArgument: 'POST' | 'DELETE') => {
    if (!category && !location ) return;
    setAction(actionArgument);
  };

  const handleCleanup = () => {
    setAction('');
    setCategory('');
    setLocation('');
  };

  const handleSubmit = async ( event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if ((!category && !location) || !action) return handleCleanup();

    const data = { tableData: category ? category : location };
    const route = category ? 'categories' : 'locations';
    const deleteNameParam = action === 'DELETE' ? `/${data.tableData}` : '';

    try {
      await apiClient.post(`/inventory/${route}${deleteNameParam}`, data);
      await loadTables();
    } catch (error) {
      console.error(error);
    } finally {
      handleCleanup();
    }
  };

  return (
    <main className="admin-page admin-inventory-page">
      <header className="admin-subpage-heading">
        <Button className="admin-back-button" variant="link" onClick={onBack}>
          ← Administración
        </Button>
        <p className="eyebrow">Inventario</p>
        <h1 className="admin-page-title">Categorías y ubicaciones</h1>
      </header>
      <Container className="admin-content">
        <Row>
          <Card className="admin-panel-card card-custom">
            <div className="admin-panel-heading">
              <Card.Title className="admin-panel-title">Gestionar opciones de inventario</Card.Title>
              <div className="admin-panel-actions">
                <Badge
                  className={'mx-2 p-2 ' + (action === 'DELETE' ? 'bg-danger' : 'bg-success')}
                >{( category || location ) ? action : ''}</Badge>
                <Button form='inventoryAdminForm' type='submit' className='me-2'
                  disabled={
                    ((!category || !location) && !action)
                  }
                >Confirmar</Button>
              </div>
            </div>
            <Form id='inventoryAdminForm' onSubmit={handleSubmit} className="admin-management-form">
              <Form.Group className="admin-management-group">
                <Form.Label className='fw-bold'>Categoría</Form.Label>
                <div className="admin-management-controls">
                  <Form.Control
                  aria-label="Nombre de categoría"
                  value={category}
                  disabled={location ? true : false}
                  onChange={(e) => handleChange(e, setCategory)}
                  />
                  <Button
                    onClick={() => handleActionChange('POST')}
                    variant='success'
                    disabled={!category ? true : false}  
                  >Añadir</Button>
                  <Button
                    onClick={() => handleActionChange('DELETE')}
                    variant='danger'
                    disabled={!category ? true : false}  
                  >Eliminar</Button>
                  <Button
                    variant='dark'
                    onClick={() => handleCleanup()}
                  >🗑️</Button>
                </div>
              </Form.Group>
              <Form.Group className="admin-management-group">
                <Form.Label className='fw-bold'>Ubicación</Form.Label>
                <div className="admin-management-controls">
                  <Form.Control
                  aria-label="Nombre de ubicación"
                  value={location}
                  disabled={category ? true : false}
                  onChange={(e) => handleChange(e, setLocation)}
                  />
                  <Button
                    onClick={() => handleActionChange('POST')}
                    variant='success'
                    disabled={!location ? true : false}  
                  >Añadir</Button>
                  <Button
                    onClick={() => handleActionChange('DELETE')}
                    variant='danger'
                    disabled={!location ? true : false}  
                  >Eliminar</Button>
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
              <th>Tipo</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(( cat ) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>Categoría</td>
                <td>{cat.name}</td>
              </tr>
            ))}
            {locations.map(( loc ) => (
              <tr key={loc.id}>
                <td>{loc.id}</td>
                <td>Ubicación</td>
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