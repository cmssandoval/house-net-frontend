import { useState } from 'react';
import { z } from 'zod';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre es demasiado largo'),
  email: z
    .email({ message: 'El formato del correo electrónico no es válido' }),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe incluir al menos una letra mayúscula')
    .regex(/[0-9]/, 'Debe incluir al menos un número'),
  confirmPassword: z
    .string()
    .min(1, 'Debes confirmar tu contraseña'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;
type FormErrors = Partial<Record<keyof RegisterFormData, string>>;

const RegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [globalError, setGlobalError] = useState('');

  const handleChange = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const name = event.target.name as keyof RegisterFormData;
    const value = event.target.value;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);

    const result = registerSchema.safeParse(updatedData);
    if (!result.success) {
      const fieldError = result.error.issues.find((issue) => issue.path[0] === name);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError ? fieldError.message : undefined,
        ...(name === 'password' || name === 'confirmPassword'
          ? { confirmPassword: result.error.issues.find((i) => i.path[0] === 'confirmPassword')?.message }
          : {}),
      }));
    } else {
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegisterSuccess(false);
    setGlobalError('');

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: FormErrors = {};

      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof RegisterFormData;
        formattedErrors[path] = issue.message;
      });

      setErrors(formattedErrors);
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setRegisterSuccess(true);
      setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
      setErrors({});
    } catch {
      setGlobalError('El correo electrónico ya se encuentra registrado.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Col className="p-4 px-lg-5 col-12 col-lg-9 col-xl-10">
      <Container className='mb-4 d-flex flex-column align-items-center gap-4'>
        <h2 className="fw-bold d-inline">Register</h2>
        <Card className='p-4 w-75 card-custom'>
          {registerSuccess && (
            <Alert variant="success" className="text-center">
              ¡Registro exitoso! Ya puedes iniciar sesión.
            </Alert>
          )}

          {globalError && (
            <Alert variant="danger" className="text-center">
              {globalError}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} noValidate>

            <Form.Group className="mb-3" controlId="formFullName">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Juan Pérez"
                value={formData.fullName}
                onChange={handleChange}
                isValid={formData.fullName.length >= 3 && !errors.fullName}
                isInvalid={!!errors.fullName}
                disabled={isLoading}
              />
              <Form.Control.Feedback type="valid">¡Se ve bien!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="ejemplo@correo.com"
                value={formData.email}
                onChange={handleChange}
                isValid={formData.email.length > 0 && !errors.email}
                isInvalid={!!errors.email}
                disabled={isLoading}
              />
              <Form.Control.Feedback type="valid">Formato de correo válido.</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Mínimo 8 caracteres, 1 mayúscula y 1 número"
                value={formData.password}
                onChange={handleChange}
                isValid={formData.password.length >= 8 && !errors.password}
                isInvalid={!!errors.password}
                disabled={isLoading}
              />
              <Form.Control.Feedback type="valid">Contraseña segura y válida.</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formConfirmPassword">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                isValid={formData.confirmPassword.length > 0 && !errors.confirmPassword}
                isInvalid={!!errors.confirmPassword}
                disabled={isLoading}
              />
              <Form.Control.Feedback type="valid">¡Las contraseñas coinciden!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" className="me-2" />
                  Registrando...
                </>
              ) : (
                'Registrarse'
              )}
            </Button>
          </Form>
        </Card>
      </Container>
    </Col>
  );
};

export default RegisterForm;