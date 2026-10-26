import { Route, Routes } from "react-router-dom";
import '@/App.css';

import { AuthProvider } from "@/contexts/AuthProvider.tsx";
import PublicRoute from "@/views/PublicRoute";
import ProtectedRoute from "@/views/ProtectedRoute.tsx";
import PublicLayout from '@/layouts/PublicLayout.tsx';
import MainLayout from "@/layouts/MainLayout.tsx";
import AdminLayout from "@/layouts/AdminLayout.tsx";

import Home from "@/views/Public/Home.tsx";
import Login from "@/views/Public/Login.tsx";
import Register from "@/views/Public/Register.tsx";
import NotFound from "@/views/Public/NotFound.tsx";
import PublicResources from "@/views/Public/PublicResources";

import Dashboard from "@/views/Private/Dashboard";
import Inventory from "@/views/Private/Inventory";
import Tasks from '@/views/Private/Tasks';
import Camera from "@/views/Private/Camera";

import Admin from "@/views/Admin/AdminDashboard";
import InventoryAdmin from '@/views/Admin/InventoryAdmin';
import UsersAdmin from "@/views/Admin/UsersAdmin";

const App = () => {
  return (
    <AuthProvider>
      <Routes>

        <Route element={<PublicRoute />}>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/public-resources' element={<PublicResources />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path='/tablero' element={<Dashboard />} />
            <Route path='/inventario' element={<Inventory />} />
            <Route path='/tareas' element={<Tasks />} />
            <Route path='/camara' element={<Camera />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<AdminLayout />}>
            <Route path='/admin' element={<Admin />} />
            <Route path='/admin/inventory' element={<InventoryAdmin />} />
            <Route path='/admin/users' element={<UsersAdmin />} />
            <Route path='/admin/tasks' element={<Admin />} />
          </Route>
        </Route>
        
        <Route path='*' element={<NotFound />} />
        
      </Routes>
    </AuthProvider>
  );
};

export default App;