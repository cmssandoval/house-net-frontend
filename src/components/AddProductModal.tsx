import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import type { Category, Location } from '../types/inventory.ts';

type CategoryState = Category | 'Categoría';
type LocationState = Location | 'Ubicación';

const categories: Category[] = ['Comida', 'Aseo'];
const locations: Location[] = ['Cocina', 'Despensa', 'Baño'];

function AddProductModal() {
  const [ productName, setProductName ] = useState<string>('');
  const [ category, setCategory ] = useState<CategoryState>('Categoría');
  const [ location, setLocation ] = useState<LocationState>('Ubicación');
  const [ stock, setStock ] = useState<string>('');
  const [ unit, setUnit ] = useState<string>('');
  const [ show, setShow ] = useState<boolean>(false);

  const handleClose = (): void => {
    setShow(false);
    handleCleanup();
  };

  const handleShow = (): void => {
    setShow(true);
    handleCleanup();
  };

  const handleCleanup = (): void => {
    setProductName('');
    setCategory('Categoría');
    setLocation('Ubicación');
    setStock('');
    setUnit('');
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = {
        productName,
        category,
        location,
        stock: Number(stock),
        unit,
      };
      console.log(data);
      console.log(JSON.stringify(data));
      const response = await fetch('http://localhost:3000/api/inventory/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      console.log(response);
      
    } catch (error) {
      console.log(error);
    }

    handleClose();
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Añadir
      </Button>

      <Modal show={show} onHide={handleClose} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Añade un producto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form id='modalForm' onSubmit={handleSubmit} className="p-1">
            <Form.Group className="d-flex flex-column gap-4 m-1">
              <div>
                <Form.Control
                  type="text"
                  name="productName"
                  placeholder="Nombre"
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                  required
                />

              </div>
              <div className='d-flex gap-5'>
                <Form.Select
                  value={category}
                  onChange={(event) => setCategory(event.target.value as Category)}
                  className="shadow-sm"
                  aria-label="Seleccionar categoría"
                >
                  <option value="Categoría" disabled hidden>
                    Categoría
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
                <Form.Select
                  value={location}
                  onChange={(event) => setLocation(event.target.value as Location)}
                  className="shadow-sm"
                  aria-label="Seleccionar ubicación"
                >
                  <option value="Ubicación" disabled hidden>
                    Ubicación
                  </option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className='d-flex justify-content-between'>
                <div className='d-flex flex-column'>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    value={stock}
                    type='number'
                    placeholder='Ej: 0-100'
                    onChange={(event) => setStock(event.target.value)}
                    className=" shadow-sm"
                    aria-label="Stock"
                    required
                  >
                  </Form.Control>

                </div>
                <div className='d-flex flex-column'>
                  <Form.Label>Unidad</Form.Label>
                  <Form.Control
                    value={unit}
                    placeholder='Ej: Caja/Bolsa/Botella'
                    onChange={(event) => setUnit(event.target.value)}
                    className="mx-auto shadow-sm"
                    aria-label="Unidad"
                    required
                  >
                  </Form.Control>
                </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" type="submit" form="modalForm">
            Añadir Producto
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProductModal;
