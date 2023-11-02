import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./reserva.css"
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { format, addDays, isSameDay } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import Footer from "../../components/footer/Footer";
import Contacts from "../../components/contacts/Contacts";

const Reserva = () => {

    const location = useLocation();
    const [dates, setDates] = useState(location.state.dates);
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState(location.state.options);
    const [adult, setAdult] = useState(options.adult);
    const [children, setChildren] = useState(options.children);
    const [room, setRoom] = useState(options.room);

    const { data, loading, error, reFetch } = useFetch(`/habitaciones?adults=${adult}&childrens=${children}`);

    const {dispatch} = useContext(SearchContext);

    const handleClick = ()=>{
            dispatch({type:"NEW_SEARCH", payload:{dates, options: { ...options, room }}});
            reFetch();
    }


    const handleAdultChange = (e) => {
        setAdult(e.target.value);
    }

    const handleChildrenChange = (e) => {
        setChildren(e.target.value);
    }

    const handleRoomChange = (e) => {
        setRoom(e.target.value);
    }

    const totalGuests = Number(adult) + Number(children);

    return(
        <div>
            <Navbar />
            <Header type="reserva" />
            <div className="reservaContainer">
                <div className="reservaWrapper">
                    <div className="reservaSearch">
                        <h1 className="reservaTitle">Búsqueda</h1>
                        <div className="reservaItem">
                            <label>Fecha de Ingreso y Salida</label>
                            <span onClick={()=>setOpenDate(!openDate)} className="headerSerchText">{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                            {openDate && <DateRange 
                            onChange={(item) => {
                                const maxEndDate = addDays(item.selection.startDate, 30);
                                let endDate = item.selection.endDate;

                                if (isSameDay(item.selection.startDate, item.selection.endDate)) {
                                endDate = addDays(item.selection.endDate, 1);
                                }

                                endDate = endDate > maxEndDate ? maxEndDate : endDate;

                                setDates([{ ...item.selection, endDate }]);
                            }}
                            moveRangeOnFirstSelection={false}
                            minDate={new Date()}
                            ranges={dates}
                            />}
                        </div>
                        <div className="reservaItem">
                            <label>Opciones</label>
                            <div className="reservaOpciones">
                                <div className="reservaOpcionesItem">
                                    <span className="reservaOpcionesText">
                                        Adultos
                                    </span>
                                    <input type="number" min={1} max={4} onChange={handleAdultChange} className="reservaOpcionesInput" placeholder={options.adult}/>
                                </div>
                                <div className="reservaOpcionesItem">
                                    <span className="reservaOpcionesText">
                                        Niños
                                    </span>
                                    <input type="number" min={0} max={3} onChange={handleChildrenChange} className="reservaOpcionesInput" placeholder={options.children}/>
                                </div>
                                <div className="reservaOpcionesItem">
                                    <span className="reservaOpcionesText">
                                        Habitaciones
                                    </span>
                                    <input type="number" min={1} max={3} onChange={handleRoomChange} className="reservaOpcionesInput" placeholder={options.room}/>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClick}>Buscar</button>
                    </div>
                    <div className="reservaResults">
                        {loading ? "cargando..." : (
                            <>
                            {totalGuests > 4 ? (
                                <div className="errorM"> ¡ La búsqueda excede la capacidad máxima de 4 personas !</div>
                            ) : (
                                <>
                                {data.map(item => (
                                    <SearchItem item={item} key={item._id} />
                                ))}
                                </>
                            )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Contacts />
            <Footer/> 
        </div>
    )
}

export default Reserva