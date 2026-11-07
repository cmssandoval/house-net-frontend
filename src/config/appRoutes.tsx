import type { ReactElement } from 'react';
import type { Role } from "@/types/auth";

import Home from '@/views/Auth/Home';
import Login from '@/views/Auth/Login';
import Register from '@/views/Auth/Register';
import PublicResources from '@/views/Public/PublicResources';
import Dashboard from '@/views/Private/Dashboard';
import Inventory from '@/views/Private/Inventory';
import AdminDashboard from '@/views/Admin/AdminDashboard';
import InventoryAdmin from '@/views/Admin/InventoryAdmin';
import UsersAdmin from '@/views/Admin/UsersAdmin';

interface AppRoute {
  path: string;
  label: string;
  roles: Role[];
  element: ReactElement;
  disabled?: boolean;
  hidden?: boolean;
}

const appRoutes:AppRoute[] = [
  { path: '/',                  label: 'Inicio',        roles: ['guest'], element: <Home /> },
  { path: '/login',             label: 'Login',         roles: ['guest'], element: <Login /> },
  { path: '/register',          label: 'Register',      roles: ['guest'], element: <Register /> },
  
  // { path: '/public-tools',      label: 'Herramientas',  roles: ['admin', 'user', 'guest'], element: <PublicTools />, disabled: true },

  { path: '/tablero',           label: 'Tablero',       roles: ['admin', 'user'], element: <Dashboard />  },
  { path: '/inventario',        label: 'Inventario',    roles: ['admin', 'user'], element: <Inventory />  },
  // { path: '/tareas',            label: 'Tareas',        roles: ['admin', 'user'], element: <Tasks />  },
  // { path: '/camara',            label: 'Cámara',        roles: ['admin', 'user'], element: <Camera /> , disabled: true },

  { path: '/admin',             label: '$ADMIN',      roles: ['admin'], element: <AdminDashboard />  },
  { path: '/admin/inventory',   label: '$INVENTORY',  roles: ['admin'], element: <InventoryAdmin />,  hidden: true  },
  { path: '/admin/users',       label: '$USER',       roles: ['admin'], element: <UsersAdmin />,      hidden: true  },
  // { path: '/admin/settings',    label: '$SETTINGS',     roles: ['admin'] },

  { path: '/public-resources',  label: 'Recursos',      roles: ['admin', 'user', 'guest'], element: <PublicResources />  },
];

export default appRoutes;
