import React from "react";
import "./contacts.css";
import { faEnvelope, faLocationDot, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contacts = () => {
    return(
       <div className="contacts">
            <div className="fLists">
               <ul className="fList">
                   <h3 className="prl-title"><FontAwesomeIcon icon={faEnvelope} className="contactItem"/> Contactos</h3>
                   <li className="fListItem">Email: libertadorhotel@hotmail.com</li>
                   <li className="fListItem">WhatsApp: 3804634541</li>
                   <li className="fListItem">Teléfono fijo: 4427474</li>
               </ul>
               <ul className="fList">
                   <h3><FontAwesomeIcon icon={faLocationDot} className="contactItem"/> Dirección</h3>
                   <li className="fListItem">
                       <p>Buenos Aires 253 </p>
                       <p>La Rioja Capital, Argentina</p>
                    </li>
               </ul>
               <ul className="fList">
                   <h3><FontAwesomeIcon icon={faShareNodes} className="contactItem"/> Redes Sociales</h3>
                   <li className="fListItem">Facebook: @libertador.hotel</li>
               </ul>
            </div>
       </div>
    )
}

export default Contacts