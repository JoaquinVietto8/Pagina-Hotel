import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import "./habitacion.css"
import NavBar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBellConcierge, faBriefcase, faBroom, faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faKey, faMugSaucer, faShower, faSnowflake, faSquareParking, faStar, faTemperatureQuarter, faTv, faWifi} from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "../../context/SearchContext";
import Contacts from "../../components/contacts/Contacts";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";


const Habitacion = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const {data, loading, error} = useFetch(`/habitaciones/find/${id}`);

    const {user} = useContext(AuthContext);

    const navigate = useNavigate();

    const {dates, options} = useContext(SearchContext);

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2){
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    };

    const days = dayDifference(dates[0].endDate, dates[0].startDate);

    {/*const photos =[
        {
            src: "images/habitacion1.jpg"
        },    
        {
            src: "images/baño1.jpg"
        }, 
        {
            src: "images/tv1.jpg"
        } 
    ]; */}

    const handleOpen = (i)=>{
        setSlideNumber(i);
        setOpen(true);
    };

    const handleMove = (direction)=>{
        let newSlideNumber;

        if(direction==="l"){
            newSlideNumber = slideNumber === 0 ? 2 : slideNumber-1
        }else{
            newSlideNumber = slideNumber === 2 ? 0 : slideNumber+1
        }

        setSlideNumber(newSlideNumber)
    };

    const handleClick = () =>{
        if(user){
            setOpenModal(true);
        }else{
            navigate("/login");
        }
    }

    /* Calculamos el precio total de la reserva multiplicando la cantidad de dias */
    const totalPrice = days * data.precio * options.room;

    return(
        <div>
            <NavBar />
            <Header type="reserva"/>
            {loading ? ("loading" ) : ( <div className="habitacionContainer">
                {open && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)}/>
                    <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>               
                    <div className="sliderWrapper">
                        <img src={data.photos[slideNumber]} alt="" className="sliderImg"/>
                    </div>
                    <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove("r")}/>
                </div>} 
                <div className="habitacionWrapper">
                    
                    <span className="habitacionT">{data.titulo}</span>
                    <div className="habitacionCantidad">
                        <FontAwesomeIcon icon={faBed} />
                        <span>{data.descripcion}</span>
                    </div>
                    <div className="habitacionCantidad">
                        <span>Capacidad máxima de personas: {data.maxPeople}</span>
                    </div>
                    <div className="habitacionImages">
                        {data.photos && data.photos.map((photo, i)=>(
                            <div className="habitacionImgWrapper">
                                <img onClick={()=>handleOpen(i)} src={photo} alt="" className="habitacionImg"/>
                            </div>
                        ))}
                    </div>
                    <div className="habitacionDetails">
                        <div className="habitacionDetailsText">
                            <div className="info">
                                <h2 className="habitacionInfo"><u>Información</u></h2>
                                <scan>Tu comodidad es nuestra máxima prioridad, es por eso que te brindamos lo siguiente: </scan>
                            </div>
                            <h3 className="habitacionDescription">Servicios</h3>
                            <div className="serviciosX">
                                <span className="habitacionServicios"><FontAwesomeIcon icon={faWifi} /> Wifi gratis</span>
                                <span className="habitacionServicios"><FontAwesomeIcon icon={faMugSaucer} /> Desayuno</span>
                                <span className="habitacionServicios"><FontAwesomeIcon icon={faSquareParking} /> Estacionamiento</span>
                                <span className="habitacionServicios"><FontAwesomeIcon icon={faBroom} /> Limpieza</span>
                            </div>
                            <h3 className="habitacionDescription">Características de la habitación</h3>
                            <div className="caracteristicas">
                                <span className="habitacionCategoria"><FontAwesomeIcon icon={faSnowflake} /> Aire acondicionado</span>
                                <span className="habitacionCategoria"><FontAwesomeIcon icon={faTemperatureQuarter} /> Calefacción</span>
                                <span className="habitacionCategoria"><FontAwesomeIcon icon={faTv} /> Televisión</span>
                                <span className="habitacionCategoria"><FontAwesomeIcon icon={faShower} /> Agua caliente</span>
                            </div>
                            <h3 className="habitacionDescription">Horarios</h3>
                            <div className="horarios">
                                <span className="habitacionCategoria"><FontAwesomeIcon icon={faKey} /> Check-In: 24 hrs</span>
                                <span className="habitacionCategoria"><FontAwesomeIcon icon={faBellConcierge} /> Conserjería: 24 hrs</span>
                                <span className="habitacionCategoria"><FontAwesomeIcon icon={faMugSaucer} /> Desayuno: 7 am a 10 am</span>
                                <span className="habitacionCategoria"><FontAwesomeIcon icon={faBriefcase} /> Check-Out: 10 am</span>
                            </div>
                            <h3 className="habitacionDescription">Categoría</h3>
                            <div className="categoria">
                                <span className="habitacionCategoria">
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                </span>
                            </div>
                        </div>
                        <div className="habitacionPrecio">
                            <h1>CONDICIONES DE TU RESERVA</h1>
                            <span>Puedes cancelar tu reserva, luego de realizarla, de forma gratuita,
                                y no se cobrará ningún costo extra.
                            </span>
                            <h2> <b>${totalPrice}</b> ({days} noche)</h2>
                            <button onClick={handleClick}>Realizar reserva</button>
                        </div>
                    </div>
                </div>
                <Contacts/>
                <Footer />
            </div> )}
            {openModal && <Reserve setOpen={setOpenModal} habitacionId={id} totalPrice={totalPrice}/>}
        </div>
    )
}

export default Habitacion