import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Destacados.css';

const Destacados = () => {
    const [actividades, setActividades] = useState([]);

    useEffect(() => {
        const fetchActividades = async () => {
            try {
                const response = await axios.get('http://localhost:4000/actividades/random');
                setActividades(response.data);
            } catch (error) {
                console.error('Error al cargar actividades:', error);
            }
        };
        
        fetchActividades();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="titulo-destacado">Destacados</h2>
            <div className="row">
                {/* Primera columna con la actividad destacada */}
                {actividades[0] && (
                    <div className="col-md-7">
                        <div className="card mb-4 card-grande">
                            <img
                                src={`http://localhost:4000/uploads/${actividades[0].imagenes[0]}`}
                                style={{ height: "800px", objectFit: "cover", borderRadius: "10px" }}
                                alt={actividades[0].nombre_actividad}
                                className="img-fluid"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{actividades[0].nombre_actividad}</h5>
                                <p className="card-text">{actividades[0].descripcion}</p>
                                <a href={`/actividades/${actividades[0].id}`} className="font-italic" style={{ color: "#242323" }}>Más información</a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Segunda columna con las dos actividades pequeñas */}
                <div className="col-md-5 d-flex flex-column">
                    {actividades.slice(1, 3).map((actividad, index) => (
                        <div key={index} className="card mb-4 card-pequena flex-grow-1">
                            <img
                                src={`http://localhost:4000/uploads/${actividad.imagenes[0]}`}
                                style={{ height: index === 0 ? "300px" : "340px", objectFit: "cover", borderRadius: "10px" }}
                                alt={actividad.nombre_actividad}
                                className="card-img-top"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{actividad.nombre_actividad}</h5>
                                <p className="card-text">{actividad.descripcion.slice(0, 60)}...</p>
                                <a href={`/actividades/${actividad.id}`} className="font-italic" style={{ color: "#242323" }}>Más información</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Destacados;
