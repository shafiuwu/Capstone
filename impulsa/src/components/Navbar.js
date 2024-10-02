import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container-fluid">
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style={{ "--bs-scroll-height": "100px" }}>
                        <a className="nav-link actives espacio fs-3 fw-light text-body-emphasis" aria-current="page" href="#">Nosotros</a>
                        <a className="nav-link espacio fs-3 fw-light text-body-emphasis" href="#">Misión</a>
                        <a className="nav-link espacio fs-3 fw-light text-body-emphasis" href="#">Voluntariados</a>
                        <button className="nav-link btn fs-4" onClick={toggleMenu} aria-label="Open menu">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú lateral */}
            <div className={`sidebar ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
                <Link to="/login">Login</Link>
                <Link to="/registro">Registro</Link>
                <Link to="/registro-organizacion">Registro de organización</Link>
                <Link to="/agregar-actividad">Actividad</Link>
            </div>
        </nav>
    );
}

export default Navbar;
