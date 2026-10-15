import { Route, Routes } from "react-router-dom";
import './App.css';

import Home from "./views/Home.tsx";
import Casa from "./views/Casa.tsx";
import NotFound from "./views/NotFound.tsx";
import Login from "./views/Login.tsx";
import Register from "./views/Register.tsx";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/casa' element={<Casa />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;