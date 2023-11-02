import React from "react";
import "./cancelation.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router";

const Cancelation = ({setOpenC, selectedRooms, dates, alldates}) =>{
    const navigate = useNavigate();
   
console.log(alldates);
console.log(dates);

const handleClickD = async () => {
  try {
    await Promise.all(
      selectedRooms.map((room) => {
        const res = axios.put(`/habitaciones/delavailability/${room._id}`, {
          dates: alldates,
        });
        return res.data;
      })
    );
    setOpenC(false);
    navigate("/");

  } catch (err) {
    console.log(err);
}
};
    
    return(
        <div className="cancelation">
            <div className="cancelContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="cancelClose" onClick={()=> setOpenC(false)}/>
                <span className="cancelTitle">¿ Deseas cancelar la reserva ?</span>
                <div className="cancelBoxButtons">
                        <button className="caxButton" onClick={handleClickD}> Si </button>
                        <button className="caxButton" onClick={()=> setOpenC(false)}> No </button>
                </div>
            </div>
        </div>
    )
    
};

export default Cancelation;