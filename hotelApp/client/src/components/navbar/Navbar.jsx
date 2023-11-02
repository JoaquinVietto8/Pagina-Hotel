import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {

    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () =>{
        await axios.post("/auth/logout");
        dispatch({ type: "LOGOUT" });
        navigate("/");
    };

    return(
        <div className="navbar">
            <div className="navContainer">
                <h1 className="logo"><a href="/">LH</a></h1>
                {user ? (
                    <div className="navItems">
                        <button className="navButton">{user.username}</button>
                        <button className="navButton"  onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                ) : (
                    <div className="navItems">
                        <Link to={`/register`}>
                            <button className="navButton">Registrarse</button>
                        </Link>
                        <Link to={`/login`}>
                            <button className="navButton">Iniciar sesión</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar