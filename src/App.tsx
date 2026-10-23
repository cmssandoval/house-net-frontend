import { Route, Routes } from "react-router-dom";
import '@/App.css';

import { AuthProvider } from "@/contexts/AuthProvider.tsx";
import ProtectedRoute from "@/views/ProtectedRoute.tsx";

import PublicLayout from '@/layouts/PublicLayout.tsx';
import MainLayout from "@/layouts/MainLayout.tsx";
import AdminLayout from "@/layouts/AdminLayout.tsx";

import Home from "@/views/Public/Home.tsx";
import Login from "@/views/Public/Login.tsx";
import Register from "@/views/Public/Register.tsx";
import NotFound from "@/views/Public/NotFound.tsx";

import Dashboard from "@/views/Auth/Dashboard.tsx";
import Inventory from "@/views/Auth/Inventory.tsx";
import Tasks from '@/views/Auth/Tasks.tsx';
import Camera from "@/views/Auth/Camera.tsx";
import Admin from "@/views/Admin/Admin.tsx";
import PublicRoute from "./views/PublicRoute";
import PublicResources from "./views/Public/PublicResources";

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
          </Route>
        </Route>
        
        <Route path='*' element={<NotFound />} />
        
      </Routes>
    </AuthProvider>
  );
};

export default App;