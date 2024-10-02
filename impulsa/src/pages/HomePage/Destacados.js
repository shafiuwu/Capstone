import React from 'react';
import './Destacados.css'; 

const Destacados = () => {
    return (
        <div className="container mt-4">
            <div className="row">
                {/* Primera columna */}
                <div className="col-md-6">
                    <div className="card mb-4 card-grande">
                        <img src="ruta/a/tu/imagen.jpg" alt="Descripción de la imagen" className="img-fluid"/>
                        <div className="card-body">
                            <h5 className="card-title">Título de la Card Grande</h5>
                            <p className="card-text">Descripción breve de la card grande. Aquí puedes agregar más detalles sobre el contenido.</p>
                            <a href="ruta/a/tu/enlace-grande" className="btn btn-primary">Ir a enlace</a>
                        </div>
                    </div>
                </div>
                {/* Segunda columna */}
                <div className="col-md-6 d-flex flex-column">
                    <div className="card mb-4 card-pequena flex-grow-1">
                        <img src="ruta/a/tu/imagen1.jpg" alt="Descripción de la imagen 1" className="card-img-top"/>
                        <div className="card-body">
                            <h5 className="card-title">Título Card 1</h5>
                            <p className="card-text">Descripción breve de la card 1.</p>
                            <a href="ruta/a/tu/enlace1" className="btn btn-primary">Ir a enlace</a>
                        </div>
                    </div>
                    <div className="card mb-4 card-pequena flex-grow-1">
                        <img src="ruta/a/tu/imagen2.jpg" alt="Descripción de la imagen 2" className="card-img-top"/>
                        <div className="card-body">
                            <h5 className="card-title">Título Card 2</h5>
                            <p className="card-text">Descripción breve de la card 2.</p>
                            <a href="ruta/a/tu/enlace2" className="btn btn-primary">Ir a enlace</a>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    );
}

export default Destacados;