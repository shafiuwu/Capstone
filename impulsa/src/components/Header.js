import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

const Header = () => {

    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null); // Referencia al menú lateral

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        // Cierra el menú si el clic está fuera del menú y del botón
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        // Agregar el evento para detectar clics fuera del menú
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            // Limpiar el evento al desmontar el componente
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="header">
            <div className='overlay'></div>
            <nav class="navbar navbar-expand-lg custom-navbar">
                <div class="container-fluid">
                    <div class={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNavAltMarkup">
                        <div class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style={{"--bs-scroll-height": "100px"}}> 
                            <a class="nav-link actives espacio" aria-current="page" href="#">Nosotros</a>
                            <a class="nav-link espacio" href="#">Misión</a>
                            <a class="nav-link espacio" href="#">Voluntariados</a>
                            {/* Asegurando que el botón de menú esté siempre visible */}
                            <button className="nav-link btn" onClick={toggleMenu} aria-label="Open menu">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>    
            <div className="header-content">
                <h1 className="header-title">Impulsa</h1>
                <p className="header-slogan">Conecta, Apoya, Transforma</p>
                <button className="btn boton-header">Ser parte</button>
            </div>
            {/* Menú lateral que se activa */}
            <div className={`sidebar ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
                <a href="#">Enlace 1</a>
                <a href="#">Enlace 2</a>
                <a href="#">Enlace 3</a>
            </div>   
        </header>
          
    );
}

export default Header;
