import React from "react";
import "./mapa.css";
import Iframe from 'react-iframe'


const Mapa = () => {
    return(
        
        <div className="mapa">
            <div className="hText">
                <div className="content">
                    <h2>Hubicacion privilegiada</h2>
                    <p> Nuestro hotel está ubicado en el corazón del centro de la capital riojana, una ubicación privilegiada que brinda 
                    numerosas ventajas para nuestros huéspedes. Entre ellas podemos destacar la accesibilidad a los principales puntos de 
                    interés de la ciudad. Al estar en el centro, los huéspedes tienen fácil acceso a atracciones turísticas, tiendas, restaurantes 
                    y lugares de entretenimiento. Ya sea que deseen explorar los sitios históricos, como el Museo Regional, la Catedral de La Rioja 
                    o la Casa de Gobierno, o disfrutar de la vida nocturna local, todo está a poca distancia a pie o en corto trayecto en automóvil 
                    desde el hotel.
                    Además, la ubicación central del hotel facilita el transporte hacia otros destinos dentro de la provincia de La Rioja. Si los 
                    huéspedes desean realizar excursiones a los parques nacionales, como el Parque Nacional Talampaya o el Parque Nacional Sierra 
                    de las Quijadas, o explorar las impresionantes montañas y paisajes de la región, el hotel se convierte en un punto de partida 
                    conveniente. 
                    </p>
                </div>
            </div>
            <div class="mapaItem">
                <Iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13901.668712183779!2d-66.8561249!3d-29.4166012!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9427dbcad469a0d1%3A0xa064411a892de391!2sHotel%20Libertador!5e0!3m2!1ses-419!2sar!4v1680630153112!5m2!1ses-419!2sar" frameborder="0" className="mapHotel"/>
            </div>
        </div>
    )
}

export default Mapa