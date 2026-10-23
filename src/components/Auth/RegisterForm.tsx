import { useState } from 'react';

import type { FormErrors } from '@/types/forms.ts';
import { registerSchema } from '@/schemas/register.ts';
import type { RegisterFormData, RegisterSubmitData } from '@/schemas/register.ts';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';

type RegisterFormProps = { onSubmit: ( data: RegisterSubmitData ) => Promise<void> };

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {

  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors<RegisterFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [globalError, setGlobalError] = useState('');

  const handleChange = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const name = event.target.name as keyof RegisterFormData;
    const value = event.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegisterSuccess(false);
    setGlobalError('');

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: FormErrors<RegisterFormData> = {};

      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof RegisterFormData;
        formattedErrors[path] = issue.message;
      });

      setErrors(formattedErrors);
      return;
    }

    setIsLoading(true);

    const submitData: Partial<RegisterFormData> = { ...formData };
    delete submitData.confirmPassword; 

    try {
      await onSubmit(submitData as RegisterSubmitData);
      setRegisterSuccess(true);
      // setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
      setErrors({});
    } catch (err){
      setGlobalError(err instanceof Error ? err.message : 'Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className='d-flex flex-column align-items-center gap-4'>
      <Card className='p-4 w-75 card-custom'>
        <h2 className="pb-3 fw-bold d-inline">Registrarse</h2>
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

          <Button variant="dark" type="submit" className="w-100" disabled={isLoading}>
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

        <p className='mt-4 text-center'>¿Ya tienes cuenta? <Link to={'/login'}>Inicia Sesión</Link></p>
        
      </Card>
    </Container>
  );
};

export default RegisterForm;