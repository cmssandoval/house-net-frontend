import { useState } from 'react';
import type { Category, Location } from '../types/inventory.ts';
import type { FormErrors } from '../types/forms.ts';
import { addProduct, type AddProductFormData } from '../schemas/addProduct.ts';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const categories: Category[] = ['Comida', 'Aseo'];
const locations: Location[] = ['Cocina', 'Despensa', 'Baño'];

function AddProductModal() {
  const [ formData, setFormData ] = useState<AddProductFormData>({
    productName: '',
    category: 'Categoría',
    location: 'Ubicación',
    stock: '',
    unit: '',
  });

  const [ show, setShow ] = useState<boolean>(false);
  const [ errors, setErrors ] = useState<FormErrors<AddProductFormData>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = event.target.name as keyof AddProductFormData;
    const value = event.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleClose = (): void => {
    setShow(false);
  };

  const handleShow = (): void => {
    setShow(true);
  };

  const handleDiscardDataClose = () => {
    setShow(false);
    setErrors({});
    handleCleanup();
  };

  const handleCleanup = (): void => {
    setFormData({
      productName: '',
      category: 'Categoría',
      location: 'Ubicación',
      stock: '',
      unit: '',
    });
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = addProduct.safeParse(formData);

    if (!result.success) {
      const formattedErrors: FormErrors<AddProductFormData> = {};

      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof AddProductFormData;
        formattedErrors[path] = issue.message;
      });

      setErrors(formattedErrors);
      return;
    }

    try {
      const data = {
        ...formData,
        stock: Number(formData.stock),
      };
      
      const response = await fetch('http://localhost:3000/api/inventory/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      setErrors({});
      alert('Producto ingresado con éxito');
    } catch (error) {
      alert('Error al ingresar datos del producto');
      console.log(error);
    } finally {
      handleDiscardDataClose();
    }
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Añadir
      </Button>

      <Modal show={show} onHide={handleClose} scrollable>
        <Modal.Header>
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
                  value={formData.productName}
                  onChange={handleChange}
                  isInvalid={!!errors.productName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.productName}
                </Form.Control.Feedback>

              </div>
              <div className='d-flex gap-5'>
                <Form.Select
                  aria-label="Seleccionar categoría"
                  className="shadow-sm"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
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
                  aria-label="Seleccionar ubicación"
                  className="shadow-sm"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
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
              <div className='d-flex justify-content-between gap-5'>
                <div className='d-flex flex-column'>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    aria-label="Stock"
                    className="shadow-sm"
                    name="stock"
                    type='number'
                    placeholder='Ej: 0-100'
                    value={formData.stock}
                    onChange={handleChange}
                    isInvalid={!!errors.stock}
                  />
                <Form.Control.Feedback type="invalid">
                  {errors.stock}
                </Form.Control.Feedback>                  

                </div>
                <div className='d-flex flex-column'>
                  <Form.Label>Unidad</Form.Label>
                  <Form.Control
                    aria-label="Unidad"
                    className="shadow-sm"
                    name="unit"
                    type='text'
                    value={formData.unit}
                    placeholder='Ej: Caja/Bolsa/Botella'
                    onChange={handleChange}
                    isInvalid={!!errors.unit}
                  />
                <Form.Control.Feedback type="invalid">
                  {errors.unit}
                </Form.Control.Feedback>  
                </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleDiscardDataClose}>
            Descartar
          </Button>
          <Button variant="warning" onClick={handleClose}>
            Guardar borrador
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
