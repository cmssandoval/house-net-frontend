import { useState } from 'react';
import { loginSchema, type LoginFormData } from '../schemas/login';
import type { FormErrors } from '../types/forms';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

type LoginFormProps = { onSubmit: ( data: LoginFormData ) => Promise<void> };

const LoginForm = ({ onSubmit }: LoginFormProps) => {

  const [ formData, setFormData ] = useState<LoginFormData>({
    email: '',
    password: '',
    role: 'usuario',
  });

  const [ errors, setErrors ] = useState<FormErrors<LoginFormData>>({});
  const [ isLoading, setIsLoading ] = useState(false);
  const [ loginSuccess, setLoginSuccess ] = useState(false);
  const [ globalError, setGlobalError ] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = event.target.name as keyof LoginFormData;
    const value = event.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginSuccess(false);
    setGlobalError('');

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: FormErrors<LoginFormData> = {};

      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof LoginFormData;
        formattedErrors[path] = issue.message;
      });

      setErrors(formattedErrors);
      return;
    }

    setIsLoading(true);

    try {
      await onSubmit(formData);
      setLoginSuccess(true);
      setFormData({ email: '', password: '', role: 'usuario', });
      setErrors({});
    } catch {
      setGlobalError('Credenciales incorrectas. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Col className="p-4 px-lg-5 col-12 col-lg-9 col-xl-10">
      <Container className='mb-4 d-flex flex-column align-items-center gap-4'>
        <h2 className="fw-bold d-inline">Login</h2>
        <Card className='p-4 w-75 card-custom'>
          {loginSuccess && (
            <Alert variant="success" className="text-center">
              ¡Ingreso exitoso! Redirigiendo...
            </Alert>
          )}
          {globalError && (
            <Alert variant="danger" className="text-center">
              {globalError}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} noValidate>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@correo.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                disabled={isLoading}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                disabled={isLoading}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Tipo de Cuenta</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                isInvalid={!!errors.role}
                disabled={isLoading}
              >
                <option value="usuario">Usuario</option>
                <option value="admin">Administrador</option>
                <option value="invitado">Invitado</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.role}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" className="me-2" />
                  Autenticando...
                </>
              ) : (
                'Ingresar'
              )}
            </Button>
            
          </Form>
          
        </Card>
      </Container>
    </Col>
  );
};

export default LoginForm;