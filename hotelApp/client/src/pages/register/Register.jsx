import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./register.css"
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

const Register = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      telefono: "",
      direccion: "",
      dni: "",
      username: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleChange = (e) => {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
      };
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await axios.post("/auth/register", state);
        setLoading(false);
        navigate("/");
    } catch (error) {
        setLoading(false);
        setError(error.response.data.message);
    }
    };
  
    return (
        <div>
            <Navbar />
            <Header type="reserva" />
            <div className="rregister">
                <div className="rrContainer">
                    <h1 class="r-heading"><span class="rtext-primary">Regis</span>tro</h1>
                    <form className="rForm" onSubmit={handleSubmit}>
                        <div className="rGroup">
                            <span>Nombre:</span><input type="text" placeholder="Nombre" id="nombre" name="nombre" value={state.nombre} onChange={handleChange} className="rInput"/>
                        </div>
                        <div className="rGroup">
                            <span>Apellido:</span><input type="text" placeholder="Apellido" id="apellido" name="apellido" value={state.apellido} onChange={handleChange} className="rInput"/>
                        </div>
                        <div className="rGroup">
                            <span>DNI:</span><input type="number" placeholder="DNI" id="dni" name="dni" value={state.dni} onChange={handleChange} className="rInput"/>
                        </div>
                        <div className="rGroup">
                            <span>Dirección:</span><input type="text" placeholder="Dirección" id="direccion" name="direccion" value={state.direccion} onChange={handleChange} className="rInput"/>
                        </div>
                        <div className="rGroup">
                            <span>Teléfono:</span><input type="number" placeholder="Telefono" id="telefono" name="telefono" value={state.telefono} onChange={handleChange} className="rInput"/>
                        </div>
                        <div className="rGroup">
                            <span>Nombre de usuario:</span><input type="text" placeholder="Nombre de usuario" id="username" name="username" value={state.username} onChange={handleChange} className="rInput"/>
                        </div>
                        <div className="rGroup">
                            <span>Email:</span><input type="email" placeholder="Email" id="email" name="email" value={state.email} onChange={handleChange} className="rInput"/>
                        </div>
                        <div className="rGroup">
                            <span>Contraseña:</span><input type="password" placeholder="Contraseña" id="password" name="password" value={state.password} onChange={handleChange} className="rInput"/>
                        </div>
                        <div className="rGroup">
                            <button disable={loading} className="reButton">{loading ? "Creando cuenta..." : "Crear cuenta"}</button>
                        </div>
                    </form>
                </div>        
                <div className="erContainer">
                    {error && <span>{error}</span>}
                </div>
            </div>
        </div>
    );
};

export default Register