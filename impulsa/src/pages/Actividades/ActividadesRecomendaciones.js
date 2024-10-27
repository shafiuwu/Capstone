import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import './Actividades.css';
import Navbar from '../../components/Navbar';

const Actividades = () => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tipoVoluntario, setVoluntarioTipo] = useState('');

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const response = await axios.get('http://localhost:4000/actividades/recomendacion', { withCredentials: true }); 
        setActividades(response.data);
      } catch (error) {
        console.error('Error al obtener actividades:', error);
      } finally {
        setLoading(false);
      }
    };

    const token = Cookies.get('tokenAcceso');
    if (token) {
      const decodedToken = jwtDecode(token); // Decodificar el token
      setVoluntarioTipo(decodedToken.tipo_voluntariado); // Establecer el tipo de voluntariado
      console.log(decodedToken.tipo_voluntariado)
    }

    fetchActividades();
  }, []);

  if (loading) {
    return <div className="loading">Cargando actividades...</div>;
  }

  return (
    <div className="actividades-page">
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-5">Actividades Disponibles Por Recomendación</h1>
        <div className="row">
          {actividades.map((actividad) => (
            <div className="col-md-6 col-lg-4 mb-4" key={actividad.id}>
              <div className="card actividad-card shadow-sm">
                {actividad.imagenes && actividad.imagenes.length > 0 && (
                  <Carousel className="actividad-carousel">
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
                <div className="card-body">
                  <h5 className="card-title text-center">{actividad.nombre_actividad}</h5>
                  <p className="card-text">
                    <strong>Organización a Cargo:</strong> {actividad.organizacion_a_cargo} <br />
                    <strong>Dirección:</strong> {actividad.direccion} <br />
                    <strong>Requisitos:</strong> {actividad.requisitos} <br />
                    <strong>Fecha Inicio:</strong> {new Date(actividad.fecha_inicio).toLocaleDateString()} <br />
                    <strong>Fecha Fin:</strong> {new Date(actividad.fecha_fin).toLocaleDateString()} <br />
                    <strong>Descripción:</strong> {actividad.descripcion.length > 100 
                      ? actividad.descripcion.slice(0, 100) + '...' 
                      : actividad.descripcion
                    }
                    {actividad.descripcion.length > 100 && (
                      <Link to={`/actividades/${actividad.id}`} className="btn btn-link">
                        Ver más
                      </Link>
                    )}
                  </p>
                  
                  {tipoVoluntario === "Por descubrir" && (
                    <p className="text-warning">
                      Aún no has hecho el formulario de intereses. Rellénalo y descubre qué tipo de voluntariado es para ti.
                    </p>
                  )}
                  <strong>Categoría:</strong> {actividad.categoria ? actividad.categoria : 'Sin categoría'}
                </div>
                <div className="card-footer text-center">
                  <Link to={`/actividades/${actividad.id}`} className="btn btn-primary">
                    Ver Detalles
                  </Link>
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
