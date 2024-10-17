import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './ActividadDetalle.css';
import Navbar from '../../components/Navbar';

const ActividadDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [actividad, setActividad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voluntarioId, setVoluntarioId] = useState(null);
  const [volunarioRolId, setVolunarioRolId] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchActividad = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/actividades/${id}`);
        setActividad(response.data);
      } catch (error) {
        console.error('Error al obtener la actividad:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchVoluntarioId = () => {
      const token = document.cookie.split('=')[1];
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setVoluntarioId(decodedToken.id);
        setVolunarioRolId(decodedToken.rol_id);
      }
    };

    fetchActividad();
    fetchVoluntarioId();
  }, [id]);

  const irActualizarActividad = () => {
    navigate(`/actualizar-actividad/${id}`); // Redirigir a la página de actualización con el ID
  };

  const handlePostular = async () => {
    if (!voluntarioId) {
      setMensaje('Necesitas estar logeado para postular a esta actividad.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/postular', {
        actividad_id: id,
        voluntario_id: voluntarioId
      }, {
        withCredentials: true
      });
      alert('¡Postulación realizada con éxito!');
      setMensaje(response.data.message);
    } catch (error) {
      console.error('Error al postular:', error);
      alert('Error al postular a la actividad.');
      setMensaje('Error al postular a la actividad.');
    }
  };

  const handleEliminar = async () => {
    const confirmDelete = window.confirm(`¿Seguro que quieres eliminar ${actividad.nombre_actividad}?`);
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:4000/actividades/${id}`);
        alert(response.data.message);
        // Puedes redirigir o hacer algo después de la eliminación, como volver a la lista de actividades
      } catch (error) {
        console.error('Error al eliminar la actividad:', error);
        alert('Error al eliminar la actividad.');
      }
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!actividad) {
    return <div>No se encontró la actividad</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>{actividad.nombre_actividad}</h1>
        <p><strong>Organización a Cargo:</strong> {actividad.organizacion_a_cargo}</p>
        <p><strong>Dirección:</strong> {actividad.direccion}</p>
        <p><strong>Requisitos:</strong> {actividad.requisitos}</p>
        <p><strong>Fecha Inicio:</strong> {actividad.fecha_inicio}</p>
        <p><strong>Fecha Fin:</strong> {actividad.fecha_fin}</p>
        <p><strong>Descripción:</strong> {actividad.descripcion}</p>

        {actividad.imagenes && actividad.imagenes.length > 0 && (
          <Carousel className="actividad-detalle-carousel">
            {actividad.imagenes.map((imagen, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={`http://localhost:4000/uploads/${imagen}`}
                  alt={`Imagen de ${actividad.nombre_actividad}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}

        {/* Botón para postular */}
        <Button variant="primary" onClick={handlePostular} className='mt-3'>
          Postular
        </Button>

        {mensaje && <div className="mt-3 text-center">{mensaje}</div>}

        {volunarioRolId === 2 && (
          <Button variant="danger" className="mt-3" onClick={handleEliminar}>
            Eliminar Actividad
          </Button>
        )}
        
        {volunarioRolId === 3 && voluntarioId === actividad.organizacion_id && (
          <Button variant="dark" className="mt-3" onClick={irActualizarActividad}>
            Actualizar
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActividadDetalle;
