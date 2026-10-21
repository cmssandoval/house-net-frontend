import { Route, Routes } from "react-router-dom";
import './App.css';

import AuthLayout from './layouts/AuthLayout';
import MainLayout from "./layouts/MainLayout.tsx";

import Home from "./views/Home.tsx";
import Login from "./views/Login.tsx";
import Register from "./views/Register.tsx";
import NotFound from "./views/NotFound.tsx";

import Dashboard from "./views/Dashboard.tsx";
import Inventory from "./views/Inventory.tsx";
import Tasks from './views/Tasks';
import Camera from "./views/Camera.tsx";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path='/tablero' element={<Dashboard />} />
        <Route path='/inventario' element={<Inventory />} />
        <Route path='/tareas' element={<Tasks />} />
        <Route path='/camara' element={<Camera />} />
      </Route>
    </Routes>
  );
};

export default App;