import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./login.css"
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

const Login = ()=>{

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    const {loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();


    const handleChange = (e)=>{
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}));
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try{
            const res = await axios.post("/auth/login", credentials);
            dispatch({type:"LOGIN_SUCCESS", payload: res.data});
            navigate(-1);
        }catch(err){
            dispatch({type:"LOGIN_FAILURE", payload: err.response.data});
        }
    };


    return (
        <div>
            <Navbar/>
            <Header type="reserva"/>
            <div className="login">
                <div className="lContainer">
                    <h1 class="l-heading"><span class="text-primary">Iniciar</span> sesión</h1>
                    <input type="text" placeholder="Nombre de usuario" id="username" onChange={handleChange} className="lInput"/>
                    <input type="password" placeholder="Contraseña" id="password" onChange={handleChange} className="lInput"/>
                    <button disable={loading} onClick={handleClick} className="lButton">Iniciar sesión</button>
                </div>
                <div className="eContainer">
                    {error && <span>{error.message}</span>}
                </div>
            </div>
        </div>
    );
};

export default Login