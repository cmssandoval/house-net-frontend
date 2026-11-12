import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../src/components/Auth/LoginForm.tsx';

const renderLoginForm = (onSubmit = vi.fn().mockResolvedValue(undefined)) => {
  return {
    onSubmit,
    ...render(
      <MemoryRouter>
        <LoginForm onSubmit={onSubmit} />
      </MemoryRouter>
    ),
  };
};

describe('LoginForm', () => {
  it('render the main fields and the register link', () => {
    renderLoginForm();

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /regístrate/i })).toHaveAttribute('href', '/register');
  });
});
