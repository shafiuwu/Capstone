import React from 'react';
import './Header.css';
import Navbar from '../../components/Navbar'; // Importa el Navbar

const Header = () => {
    return (
        <header className="header">
            <div className='overlay'></div>
            {/* Incluye el Navbar aquí */}
            <Navbar /> 

            <div className="header-content">
                <h1 className="header-title">Impulsa</h1>
                <p className="header-slogan">Conecta, Apoya, Transforma</p>
                <button className="btn boton-header">Ser parte</button>
            </div>
        </header>
    );
}

export default Header;
