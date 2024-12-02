import React from "react";
import './Header.css';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';

const Header = () => {

    return(
        <div style={{minHeight: "100vh"}}>
            <div className="card text-white" style={{border: "none"}}>
            
                <img src="/images/header.png" style={{height: "680px"}} className="card-img" alt="Background" />
                <div className="card-img-overlay ps-4">
                <Navbar />
                    <div style={{paddingTop: "150px"}}>
                        <h1 className="display-1" style={{color: "white"}}>Impulsa</h1>
                        <p className="lead" style={{fontSize: "30px"}}>Conecta, Apoya, Transforma</p>
                        <Link to="/registro" className="btn boton-header">
                            Ser parte
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;