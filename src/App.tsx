import { Route, Routes } from "react-router-dom";

import Home from "./views/Home";
import Casa from "./views/Casa";
import NotFound from "./views/NotFound";

import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/casa' element={<Casa />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;