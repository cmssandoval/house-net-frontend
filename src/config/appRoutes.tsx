import type { ReactElement } from 'react';
import type { Role } from "@/types/auth";

import Home from '@/views/Auth/Home';
import Login from '@/views/Auth/Login';
import Register from '@/views/Auth/Register';
import PublicResources from '@/views/Public/PublicResources';
import Dashboard from '@/views/Private/Dashboard';
import Inventory from '@/views/Private/Inventory';
import Tasks from '@/views/Private/Tasks';
import Calendar from '@/views/Private/Calendar';
import Tools from '@/views/Public/Tools';
import AdminDashboard from '@/views/Admin/AdminDashboard';

export interface AppRoute {
  path: string;
  label: string;
  roles: Role[];
  element: ReactElement;
  mobileTab?: boolean;
}

const appRoutes: AppRoute[] = [
  { path: '/', label: 'Inicio', roles: ['guest'], element: <Home />, mobileTab: true },
  { path: '/login', label: 'Iniciar sesión', roles: ['guest'], element: <Login /> },
  { path: '/register', label: 'Crear cuenta', roles: ['guest'], element: <Register /> },

  { path: '/tablero', label: 'Inicio', roles: ['admin', 'user'], element: <Dashboard />, mobileTab: true },
  { path: '/inventario', label: 'Inventario', roles: ['admin', 'user'], element: <Inventory />, mobileTab: true },
  { path: '/tareas', label: 'Tareas', roles: ['admin', 'user'], element: <Tasks /> },
  { path: '/calendario', label: 'Calendario', roles: ['admin', 'user'], element: <Calendar /> },
  { path: '/public-tools', label: 'Herramientas', roles: ['admin', 'user', 'guest'], element: <Tools />, mobileTab: true },

  { path: '/admin', label: 'Administración', roles: ['admin'], element: <AdminDashboard /> },

  { path: '/public-resources', label: 'Recursos', roles: ['admin', 'user', 'guest'], element: <PublicResources />, mobileTab: true },
];

export default appRoutes;
