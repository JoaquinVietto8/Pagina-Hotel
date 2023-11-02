import React, { useContext, useState } from "react";
import "./reserve.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({setOpen, habitacionId, totalPrice}) =>{
    
    const [selectedRooms, setSelectedRooms] = useState([]);
    const {data, loading, error} = useFetch(`/habitaciones/getHabitacionRooms/${habitacionId}`);
    const {dates, options} = useContext(SearchContext);
    const [errorMessage, setErrorMessage] = useState('');


    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        const date = new Date(start.getTime());
    
        const dates = [];
    
        while (date <= end) {
          dates.push(new Date(date).getTime());
          date.setDate(date.getDate() + 1);
        }
    
        return dates;
      };

    
    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (item) => {
        const isFound = item.unavaiableDates.some((date) =>
          alldates.includes(new Date(date).getTime())
        );
    
        return !isFound;
    };


    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        const room = data.find((item) => item._id === value);
        setSelectedRooms( checked ? [...selectedRooms, room] : selectedRooms.filter((item) => item._id !== value)
        );
      };


    const navigate = useNavigate();

    const handleClick = async () => {
        try {
          if (selectedRooms.length === options.room) {
          await Promise.all(
            selectedRooms.map((room) => {
              const res = axios.put(`/habitaciones/availability/${room._id}`, {
                dates: alldates,
              });
              return res.data;
            })
          );
          setOpen(false);
          navigate("/detalle", {state:{selectedRooms, alldates, totalPrice, dates: {
            startDate: dates[0].startDate.toISOString(), // Asegura que las fechas sean cadenas ISO válidas
            endDate: dates[0].endDate.toISOString(),
          }, options}});
          }else{
            setErrorMessage(`Por favor, selecciona ${options.room} habitaciones`);
          }
        } catch (err) {
          console.log(err);
    }
  };


  return(
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=> setOpen(false)}/>
                <div className="tit">
                  <span className="rTitle">Selecciona tu habitación:</span>
                </div>
                <div className="typeItems">
                    <ul>
                      <li> Primera fila: Interior del hotel </li>
                      <li> Segunda fila: Vista a la calle </li>
                    </ul>
                </div>
                <div className="cItems">
                  <div className="rItem">
                      {data.map((item) => (
                            <div className="room">
                                <label>{item.number}</label>
                                <input type="checkbox" value={item._id} onChange={handleSelect} disabled={!isAvailable(item)}/>
                            </div>
                      ))}
                    </div>
                  </div>
                <div className="cButton">
                  <button onClick={handleClick} className="rButton">Confirmar reserva</button>
                </div>
                <div className="errorCont">
                  {errorMessage && <span className="errorMessage">{errorMessage}</span>}
                </div>
            </div>
        </div>
    )
    
};

export default Reserve;