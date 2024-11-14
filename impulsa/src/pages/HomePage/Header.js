import React from "react";
import './Header.css';
import Navbar from '../../components/Navbar';

const Header = () => {

    return(
        <div style={{minHeight: "100vh"}}>
            <div className="card text-white" style={{border: "none"}}>
            <Navbar />
                <img src="/images/header.png" style={{height: "680px"}} className="card-img" alt="Background" />
                <div className="card-img-overlay ps-4">
                    <div style={{paddingTop: "240px"}}>
                        <h1 className="display-1" style={{color: "white"}}>Impulsa</h1>
                        <p className="lead" style={{fontSize: "30px"}}>Conecta, Apoya, Transforma</p>
                        <button className="btn boton-header">Ser parte</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;