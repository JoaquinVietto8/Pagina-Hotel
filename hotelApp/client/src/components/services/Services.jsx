import React from "react";
import "./services.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugSaucer, faSquareParking, faWifi } from "@fortawesome/free-solid-svg-icons";

const Services = () => {
    return(
        <div className="servicios">
            <div className="box bg-light">
                <FontAwesomeIcon icon={faWifi} className="serviceItem"/>
                <h3>Wi-Fi</h3>
                <p>Contamos con conexión wi-fi gratuita en todo el establecimiento mediante fibra óptica.</p>
            </div>
            <div className="box bg-primary">
                <FontAwesomeIcon icon={faMugSaucer} className="serviceItem"/>
                <h3>Desayuno</h3>
                <p>El desayuno, la comida más importante del dia antes de ralizar las excursiones, está incluido.</p>
            </div>
            <div className="box bg-light">
                <FontAwesomeIcon icon={faSquareParking} className="serviceItem"/>
                <h3>Estacionamiento</h3>
                <p>La estadìa incluye acceso a la cochera privada del hotel, para que tu vehículo esté protegido.</p>
            </div>
      </div>
    )
}

export default Services