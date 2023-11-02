import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer"
import Contacts from "../../components/contacts/Contacts";
import Cancelation from "../../components/cancelation/Cancelation";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import "./detalle.css"

const Detalle = () => {

    const location = useLocation();
    const { selectedRooms, totalPrice, alldates, dates, options} = location.state || {};
    const {user} = useContext(AuthContext);
    const [openModalC, setOpenModalC] = useState(false);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const roomNumbersString = selectedRooms.map((room) => room.number).join(', ');


    const downloadPDF = () =>{
        const capture = document.querySelector('.actual-receipt');
        setLoader(true);
        html2canvas(capture).then((canvas)=>{
          const imgData = canvas.toDataURL('img/png');
          const doc = new jsPDF('p', 'mm', 'a4');
          const componentWidth = doc.internal.pageSize.getWidth();
          const componentHeight = doc.internal.pageSize.getHeight();
          doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
          setLoader(false);
          doc.save('Comprobante_Reserva_LH.pdf');
        })
      }


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    //const selectedRooms = location.state.selectedRooms || [];

    const handleEnd = () =>{
        navigate("/", { replace: true });
    }

    const handleClickC = () =>{
        setOpenModalC(true);
    }

    return(
    <div>
        <Navbar />
        <Header type="reserva"/>
        <div className="all">
            <div className="detalle">
                <div className="titleDetalle">
                    <h3> ¡ Felicitanciones !</h3>
                    <h3> Tu reserva se realizó con éxito </h3>
                </div>
                <div className="dComprobante">
                    <div className="actual-receipt">
                        <h3>Comprobante de Reserva</h3>
                        <h6>Hotel Libertador</h6>
                        <h6>Buenos Aires 253, La Rioja Capital, Argentina</h6>
                        <div className="phone-and-website">
                            <p> +5493804634541</p>
                            <p> libertadorhotel@hotmail.com </p>
                        </div>
                        <p> ¡ Te esperamos !</p>
                        <div className="colored-row first">
                            <span>Detalle de la Reserva</span>
                        </div>
                        <div className="data-row border-bottom">
                            <span>
                                <span className="font-weight"> Llegada: </span>
                                {' '}
                                {dates && new Date(dates.startDate).toLocaleDateString()}
                            </span>
                            <span>
                                <span className="font-weight"> Salida: </span>
                                {' '}
                                {dates && new Date(dates.endDate).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="data-row border-bottom">
                            <span>
                                <span className="font-weight"> Adultos: </span>
                                {' '}
                                {options.adult}
                            </span>
                            <span>
                                <span className="font-weight"> Niños: </span>
                                {' '}
                                {options.children}
                            </span>
                            <span>
                                <span className="font-weight"> Habitaciones: </span>
                                {' '}
                                {options.room}
                            </span>
                        </div>
                        <div className="data-row border-bottom">
                            <span>
                                <span className="font-weight"> Número de Habitación: </span>
                                {' '}
                                {roomNumbersString}
                            </span>
                        </div>
                        <div className="colored-row">
                            <span> Datos del Huésped </span>
                        </div>
                        <div className="data-row border-bottom">
                            <span>
                                <span className="font-weight"> Nombre: </span>
                                {' '}
                                {user.nombre}
                            </span>
                            <span>
                                <span className="font-weight"> Apellido: </span>
                                {' '}
                                {user.apellido}
                            </span>
                            <span>
                                <span className="font-weight"> DNI: </span>
                                {' '}
                                {user.dni}
                            </span>
                        </div>
                        <div className="data-row border-bottom">
                            <span>
                                <span className="font-weight"> Teléfono: </span>
                                {' '}
                                {user.telefono}
                            </span>
                            <span>
                                <span className="font-weight"> Email: </span>
                                {' '}
                                {user.email}
                            </span>
                        </div>
                        <div className="colored-row">
                            <span> Costo de Reservación </span>
                        </div>
                        <div className="data-row border-bottom">
                            <span>
                                <span className="font-weight"> Monto total: </span>
                                $
                                {' '}
                                {totalPrice}
                            </span>
                        </div>
                    </div>
                    <div className="receipt-actions-div">
                        <div className="actions-right">
                            <button className="receipt-modal-download-button" onClick={downloadPDF} disabled={!(loader===false)}>
                                {loader?( <span>Descargando</span> ):(<span>Descargar</span>)}
                            </button> 
                        </div>
                    </div>
                </div>
                <div className="deMessage">
                    <span>¡ ATENCIÓN ! </span>
                    <p>Si decides volver al inicio, luego no podrás cancelar/visualizar tu reserva. </p>
                    <p>Te recomendamos descargar el comprobante para visualizar el detalle.</p>
                    <p>Para cancelar la reserva posteriormente, puedes hacerlo contactándonos a nuestro correo electrónico
                    libertadorhotel@hotmail.com o a través de WhatsApp al número 3804634541.</p>
                </div>
                <div className="dContentButton">
                    <button className="deButton1" onClick={handleEnd}>Volver al inicio</button>
                    <button className="deButton2" onClick={handleClickC}>Cancelar Reserva</button>
                </div>
            </div>
            {openModalC && <Cancelation setOpenC={setOpenModalC} selectedRooms={selectedRooms} dates={dates} alldates={alldates}/>}
        </div>
        <Contacts />
        <Footer/> 
    </div>            
    );
};


export default Detalle
