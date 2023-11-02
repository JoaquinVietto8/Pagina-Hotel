import { Link } from "react-router-dom";
import "./searchItem.css"
import React from "react";

const SearchItem = ({item}) => {
    return(
        <div className="searchItem">
            {/*<img src="images/habitacion1.jpg" alt="" className="searchItemImg"/> */}
            <img src={item.photos[0]} alt="" className="searchItemImg"/>
            <div className="searchItemDescription">
                <h1 className="siTitle">{item.titulo}</h1>
                <span className="siSubtitle"> WIFI gratuito </span>
                <span className="siSubtitle"> Desayuno inlcuido </span>
                <span className="siSubtitle"> Estacionamiento inlcuido </span>
                <span className="siFeatures"> {item.descripcion} </span>
                <span className="siCancelOp"> Cancelación gratuita </span>
                <span className="siCancelOpSubtitle"> ¡ No te preocupes, podés cancelar gratis luego de reservar ! </span>
            </div>
            <div className="searchItemDetails">
                <div className="space"></div>
                <div className="siDetailTexts">
                    <span className="precio">${item.precio}</span>
                    <span className="tax">Incluye impuestos</span>
                    <Link to={`/habitaciones/${item._id}`}>
                        <button className="siCheckButton">Seleccionar</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SearchItem