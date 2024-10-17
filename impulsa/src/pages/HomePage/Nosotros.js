import React from "react";
import Footer from '../../components/Footer';
import Navbar from "../../components/Navbar";

const Nosotros = () => {
    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <Navbar />
    
        {/* Sección Nosotros */}
        <div className="container py-5">
            <div className="row align-items-center" style={{paddingLeft: "40px"}}>
                <div className="col-md-6 mb-4 mb-md-0">
                    <h1 className="display-4 text-center text-md-start fw-bold" style={{ color: "#333" }}>Nosotros</h1>
                    <p className="lead text-center text-md-start" style={{ color: "#555", fontSize: "25px"}}>
                        Somos una organización sin fines de lucro que busca fomentar el voluntariado en Chile. Nuestro objetivo es <mark className="fst-italic">conectar</mark> a personas que deseen ayudar con organizaciones que necesiten apoyo.
                    </p>
                    <p className="lead text-center text-md-start" style={{ color: "#555",fontSize: "25px" }}>
                        Si deseas ser parte de nuestro equipo, puedes registrarte en nuestra plataforma y postularte a las actividades que más te interesen.
                    </p>
                </div>
                <div className="col-md-6">
                    <img 
                        src="/images/granja.jpg" 
                        alt="Voluntarios" 
                        className="img-fluid rounded shadow" 
                        style={{ maxHeight: "400px", objectFit: "cover", marginLeft: "30px" }}
                    />
                </div>
            </div>
            <div className="row" style={{paddingTop: "110px", textAlign: "center"}}>
                <div className="col-md-6" style={{paddingRight: "40px"}}>
                    <h2 className="fw-bold display-6" style={{ color: "#333" }}>Nuestra Misión</h2>
                    <p className="lead" style={{ color: "#555", fontSize: "25px"}}>
                        Fomentar el voluntariado a nivel nacional, creando oportunidades accesibles para que las personas puedan ayudar a las organizaciones que lo necesitan.
                    </p>
                </div>
                <div className="col-md-6" style={{paddingLeft: "40px"}}>
                    <h2 className="fw-bold display-6" style={{ color: "#333" }}>Nuestra Visión</h2>
                    <p className="lead" style={{ color: "#555", fontSize: "25px" }}>
                        Ser la plataforma líder en conectar a voluntarios y organizaciones, generando un impacto positivo en la sociedad a través de la colaboración.
                    </p>
                </div>
            </div>

            <div className="container py-5">
            <h2 className="text-center fw-bold mb-5 display-6" style={{ color: "#333", paddingTop: "30px"}}>Nuestros Valores</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-4 text-center">
                        <i className="bi bi-people" style={{ fontSize: "40px", color: "#007bff" }}></i>
                        <h3 className="fw-bold mt-3" style={{ color: "#333" }}>Solidaridad</h3>
                        <p className="lead" style={{ color: "#555" }}>Creemos en la ayuda mutua y en la importancia de crear un mundo más justo.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-4 text-center">
                        <i className="bi bi-heart" style={{ fontSize: "40px", color: "#007bff" }}></i>
                        <h3 className="fw-bold mt-3" style={{ color: "#333" }}>Compromiso</h3>
                        <p className="lead" style={{ color: "#555" }}>Nos dedicamos a brindar oportunidades a quienes realmente lo necesitan.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-4 text-center">
                        <i className="bi bi-shield-check" style={{ fontSize: "40px", color: "#007bff" }}></i>
                        <h3 className="fw-bold mt-3" style={{ color: "#333" }}>Transparencia</h3>
                        <p className="lead" style={{ color: "#555" }}>Valoramos la transparencia en nuestras acciones y decisiones.</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-dark text-white py-5" style={{marginTop: "40px"}}>
            <div className="container text-center">
                <h2 className="fw-bold mb-4">¡Únete a nuestra causa!</h2>
                <p className="lead mb-4">
                    Si te apasiona ayudar y quieres ser parte de algo más grande, únete a nuestro equipo de voluntarios.
                </p>
                <a href="/registro" className="btn btn-lg btn-light fw-bold">Regístrate Aquí</a>
            </div>
        </div>


        <div className="container py-5" style={{marginTop: "40px"}}>
            <h2 className="text-center fw-bold mb-5" style={{ color: "#333" }}>¿Dónde Estamos?</h2>
            <div className="text-center">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.135414094418!2d-70.655198!3d-33.441018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf6254dbedb5%3A0x82767cddf907bfa3!2sApoquindo%205680%2C%20Las%20Condes%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1579527719264!5m2!1ses!2scl" 
                    width="100%" 
                    height="400" 
                    frameBorder="0" 
                    allowFullScreen="" 
                    aria-hidden="false" 
                    tabIndex="0">
                </iframe>
            </div>
        </div>
        </div>
        <Footer />
    </div>

        
    );
}

export default Nosotros;