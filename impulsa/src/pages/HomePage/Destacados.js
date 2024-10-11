import React from 'react';
import './Destacados.css'; 

const Destacados = () => {
    return (
        <div className="container mt-4">
            <h2 className="titulo-destacado">Destacados</h2>
            <div className="row">
                {/* Primera columna */}
                <div className="col-md-7">
                    <div className="card mb-4 card-grande">
                        <img src="/images/isla_pascua.jpg" 
                        style={{height: "800px", objectFit: "cover", borderRadius: "10px"}}
                        alt="Descripción de la imagen" className="img-fluid"/>
                        <div className="card-body">
                            <h5 className="card-title">Conservación ambiental en Isla de Pascua</h5>
                            <p className="card-text">Conoce y sé parte de la cultura de la isla</p>
                            <a href="ruta/a/tu/enlace-grande" className='font-italic' style={{color: "#242323"}}>Más información</a>
                        </div>
                    </div>
                </div>
                {/* Segunda columna */}
                <div className="col-md-5 d-flex flex-column">
                    <div className="card mb-4 card-pequena flex-grow-1">
                        <img src="/images/granja.jpg"
                        style={{height: "300px", objectFit: "cover", borderRadius: "10px"}}
                        alt="Descripción de la imagen 1" className="card-img-top"/>
                        <div className="card-body">
                            <h5 className="card-title">Explotación agrícola y ganadera</h5>
                            <p className="card-text">Granjas agrícolas libres del caos de la ciudad :)</p>
                            <a href="ruta/a/tu/enlace1" className='font-italic' style={{color: "#242323"}}>Más información</a>
                        </div>
                    </div>
                    <div className="card mb-4 card-pequena flex-grow-1">
                        <img src="images/card2.jpg"
                        style={{height: "340px", objectFit: "cover", borderRadius: "10px"}}
                        alt="Descripción de la imagen 2" className="card-img-top"/>
                        <div className="card-body">
                            <h5 className="card-title">Santuario de animales</h5>
                            <p className="card-text">Sé voluntario y participa en las diferentes campañas</p>
                            <a href="ruta/a/tu/enlace2" className='font-italic' style={{color: "#242323"}}>Más información</a>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    );
}

export default Destacados;