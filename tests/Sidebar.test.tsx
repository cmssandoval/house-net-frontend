import { it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../src/components/Sidebar.tsx';

vi.mock('@/contexts/AuthContext.ts', () => ({
  useAuth: () => ({ role: 'admin', logout: vi.fn() }),
}));
vi.mock('@/components/ThemeToggle.tsx', () => ({ default: () => null }));
vi.mock('@/config/appRoutes.tsx', () => ({
  default: [
    { path: '/tablero', label: 'Tablero', roles: ['admin'], mobileTab: true },
    { path: '/ajustes', label: 'Ajustes', roles: ['admin'] },
  ],
}));
vi.stubGlobal('__BUILD__', 'test');

it('open "Más" and close when navigating to a menu route', async () => {
  render(
    <MemoryRouter initialEntries={['/tablero']}>
      <Sidebar />
    </MemoryRouter>,
  );
  // [0] desktop, [1] mobile
  const mobile = screen.getAllByRole('navigation', { name: 'Navegación principal' })[1];

  await userEvent.click(within(mobile).getByRole('button', { name: 'Más' }));
  await userEvent.click(within(mobile).getByRole('link', { name: 'Ajustes' }));

  expect(document.getElementById('mobile-more-menu')).not.toBeInTheDocument();
});
