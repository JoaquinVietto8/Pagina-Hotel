import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Reserva from './pages/reserva/Reserva';
import Habitacion from './pages/habitacion/Habitacion';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Detalle from "./pages/detalle/Detalle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/reserva" element={<Reserva/>}/>
        <Route path="/habitaciones/:id" element={<Habitacion/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/detalle" element={<Detalle/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
