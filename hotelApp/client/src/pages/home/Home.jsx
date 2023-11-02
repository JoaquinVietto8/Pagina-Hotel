import React from "react";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import HomeRoom from "../../components/homeRoom/HomeRoom";
import Services from "../../components/services/Services";
import Footer from "../../components/footer/Footer";
import Mapa from "../../components/mapa/Mapa";
import Contacts from "../../components/contacts/Contacts";

const Home = () => {
    return(
        <div>
            <Navbar />
            <Header />
            <div className="homeContainer">
                <Featured />
            </div>
            <HomeRoom />
            <div className="titleService">
                <h2 className="serviceTitle">Servicios que ofrecemos</h2>
            </div>
            <Services />
            <Mapa />
            <Contacts />
            <Footer />
        </div>
    )
}

export default Home