import { useEffect, useState } from 'react';

import type { ApiCatLoc } from '@/types/inventory.ts';
import type { FormErrors } from '@/types/forms.ts';
import { addProduct, type AddProductFormData } from '@/schemas/addProduct.ts';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import apiClient from '@/config/axiosConfig';

interface AddProductModalProps {
  onProductAdded: () => void | Promise<void>;
}

function AddProductModal({ onProductAdded }: AddProductModalProps) {
  const [ formData, setFormData ] = useState<AddProductFormData>({
    productName: '',
    category: '',
    location: '',
    stock: '',
    unit: '',
  });

  const [ show, setShow ] = useState<boolean>(false);
  const [ errors, setErrors ] = useState<FormErrors<AddProductFormData>>({});
  const [ categories, setCategories ] = useState<ApiCatLoc[]>([]);
  const [ locations, setLocations ] = useState<ApiCatLoc[]>([]);
  const [ isLoadingOptions, setIsLoadingOptions ] = useState(true);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [categoryResponse, locationResponse] = await Promise.all([
          apiClient.get<ApiCatLoc[]>('/inventory/categories'),
          apiClient.get<ApiCatLoc[]>('/inventory/locations'),
        ]);
        setCategories(categoryResponse.data);
        setLocations(locationResponse.data);
      } catch (error) {
        console.error(error);
        alert('Error al obtener las categorías o ubicaciones...');
      } finally {
        setIsLoadingOptions(false);
      }
    };

    void loadOptions();
  }, []);

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
      category: '',
      location: '',
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
        ...result.data,
        stock: Number(result.data.stock),
      };
      
      await apiClient.post('/inventory/', data);
      await onProductAdded();
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
      <Button className="inventory-add-button" onClick={handleShow} disabled={isLoadingOptions}>
        Añadir
      </Button>

      <Modal show={show} onHide={handleClose} scrollable contentClassName="inventory-modal-content">
        <Modal.Header className="inventory-modal-header">
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
              <div className='inventory-modal-selects'>
                <Form.Select
                  aria-label="Seleccionar categoría"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Categoría
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Select
                  aria-label="Seleccionar ubicación"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Ubicación
                  </option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className='inventory-modal-numbers'>
                <div>
                  <Form.Label htmlFor='stock'>Stock</Form.Label>
                  <Form.Control
                    aria-label="Stock"
                    name="stock"
                    id="stock"
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
                <div>
                  <Form.Label htmlFor='unit'>Unidad</Form.Label>
                  <Form.Control
                    aria-label="Unidad"
                    name="unit"
                    id="unit"
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

        <Modal.Footer className="inventory-modal-footer">
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
