import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link para las rutas
import './Actividades.css';
import Navbar from '../../components/Navbar';

const Actividades = () => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const response = await axios.get('http://localhost:4000/actividades'); // Cambia esta URL a la de tu API
        setActividades(response.data);
      } catch (error) {
        console.error('Error al obtener actividades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActividades();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Actividades</h1>
        <div className="row">
          {actividades.map((actividad) => (
            <div className="col-md-6 mb-4" key={actividad.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{actividad.nombre_actividad}</h5>
                  <p className="card-text">
                    <strong>Organización a Cargo:</strong> {actividad.organizacion_a_cargo} <br />
                    <strong>Dirección:</strong> {actividad.direccion} <br />
                    <strong>Requisitos:</strong> {actividad.requisitos} <br />
                    <strong>Fecha Inicio:</strong> {actividad.fecha_inicio} <br />
                    <strong>Fecha Fin:</strong> {actividad.fecha_fin} <br />
                    <strong>Descripción:</strong> {actividad.descripcion}
                  </p>
                </div>
                <div className="card-footer">
                  {actividad.imagenes && actividad.imagenes.length > 0 && (
                    <Carousel>
                      {actividad.imagenes.map((imagen, index) => (
                        <Carousel.Item key={index}>
                          <Link to={`/actividades/${actividad.id}`}>
                            <img
                              className="d-block w-100 actividad-imagen"
                              src={`http://localhost:4000/uploads/${imagen}`}
                              alt={`Imagen de ${actividad.nombre_actividad}`}
                            />
                          </Link>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Actividades;
