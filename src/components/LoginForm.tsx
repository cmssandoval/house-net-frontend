import { useState } from 'react';
import { z } from 'zod';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const loginSchema = z.object({
  email: z
    .email('El formato del correo electrónico no es válido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(20, 'La contraseña no puede superar los 20 caracteres'),
  role: z.enum(['usuario', 'admin', 'invitado'], {
    error: 'Selecciona un rol válido',
  }),
});

type FormDataState = z.infer<typeof loginSchema>;
type FormErrors = Partial<Record<keyof FormDataState, string>>;

const LoginForm = () => {

  const [ formData, setFormData ] = useState<FormDataState>({
    email: '',
    password: '',
    role: 'usuario',
  });

  const [ errors, setErrors ] = useState<FormErrors>({});
  const [ isLoading, setIsLoading ] = useState(false);
  const [ loginSuccess, setLoginSuccess ] = useState(false);
  const [ globalError, setGlobalError ] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = event.target.name as keyof FormDataState;
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
      const formattedErrors: FormErrors = {};

      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof FormDataState;
        formattedErrors[path] = issue.message;
      });

      setErrors(formattedErrors);
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
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