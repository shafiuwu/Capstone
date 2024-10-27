import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Asegúrate de tener esta librería instalada

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOrganizacion, setIsOrganizacion] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate(); // Usa useNavigate aquí

    useEffect(() => {
        const tokenVoluntario = Cookies.get('tokenAcceso');
        const tokenOrganizacion = Cookies.get('tokenAccesoEmpresa');

        if (tokenVoluntario) {
            setIsLoggedIn(true);
            setIsOrganizacion(false);
        } else if (tokenOrganizacion) {
            setIsLoggedIn(true);
            setIsOrganizacion(true);
        }
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    const handleLogout = () => {
        // Eliminar la cookie según el tipo de usuario
        if (isOrganizacion) {
            Cookies.remove('tokenAccesoEmpresa');
        } else {
            Cookies.remove('tokenAcceso');
        }
        
        // Actualizar el estado
        setIsLoggedIn(false);
        setIsOrganizacion(false);
        
        // Redireccionar al usuario a la página de inicio o login
        navigate('/'); // Cambia history.push por navigate
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
                        <Link to="/" className="nav-link actives espacio fs-3 fw-light text-body-emphasis" aria-current="page">Inicio</Link>
                        <a className="nav-link actives espacio fs-3 fw-light text-body-emphasis" aria-current="page" href="/Nosotros">Nosotros</a>
                        <Link to="/actividades" className="nav-link espacio fs-3 fw-light text-body-emphasis">Voluntariados</Link>
                        <button className="nav-link btn fs-4" onClick={toggleMenu} aria-label="Open menu">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú lateral */}
            <div className={`sidebar ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
                {isLoggedIn ? (
                    <>
                        {isOrganizacion ? (
                            <>
                                <Link to="/agregar-actividad">Agregar Actividad</Link>
                                <Link to="/perfil-organizacion">Perfil Organización</Link>
                                <Link to="/actividades-organizacion">Mis Actividades</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/perfil">Perfil</Link>
                                <Link to="/formulario-intereses">Formulario de intereses</Link>
                                <Link to="/actividades-recomendaciones">Recomendacion de actividades</Link>
                                <Link to="/actividades-voluntario">Mis Actividades</Link>

                            </>
                        )}
                        <Link to="/" onClick={handleLogout} className="nav-link">Cerrar Sesión</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/registro">Registro</Link>
                        <Link to="/registro-organizacion">Registro de organización</Link>
                        <Link to="/login-organizacion">Login de organización</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
