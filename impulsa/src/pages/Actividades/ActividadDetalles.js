import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel, Button, Alert, Modal, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './ActividadDetalle.css';
import Navbar from '../../components/Navbar';

const ActividadDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [actividad, setActividad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voluntarioId, setVoluntarioId] = useState(null);
  const [voluntarioRolId, setVoluntarioRolId] = useState(null);
  const [mensaje, setMensaje] = useState('');

  // Estado para el modal
  const [showModal, setShowModal] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [categoria, setCategoria] = useState(''); // Estado para la categoría del reporte

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
        setVoluntarioRolId(decodedToken.rol_id);
      }
    };

    fetchActividad();
    fetchVoluntarioId();
  }, [id]);

  const irActualizarActividad = () => {
    navigate(`/actualizar-actividad/${id}`);
  };

  const handlePostular = async () => {
    if (!voluntarioId) {
      setMensaje('Necesitas estar logeado para postular a esta actividad.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/postular',
        { actividad_id: id, voluntario_id: voluntarioId },
        { withCredentials: true }
      );
      setMensaje(response.data.message);  // Muestra el mensaje de éxito si no hay error
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMensaje(error.response.data.message);  // Muestra "Ya has postulado a esta actividad"
      } else {
        console.error('Error al postular:', error);
        setMensaje('Error al postular a la actividad.');
      }
    }
  };

  const handleEliminar = async () => {
    const confirmDelete = window.confirm(`¿Seguro que quieres eliminar ${actividad.nombre_actividad}?`);
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:4000/actividades/${id}`);
        alert(response.data.message);
        navigate('/actividades');
      } catch (error) {
        console.error('Error al eliminar la actividad:', error);
        alert('Error al eliminar la actividad.');
      }
    }
  };

  const handleReportar = async () => {
    if (!motivo || !categoria) {
      alert('Por favor, ingresa un motivo y selecciona una categoría para el reporte.');
      return;
    }

    try {
      await axios.post(`http://localhost:4000/crearReporte/${id}`, {
        categoria,
        descripcion: motivo,
      });

      setShowModal(false); // Cierra el modal
      setMotivo(''); // Resetea el motivo
      setCategoria(''); // Resetea la categoría
      alert('Gracias por reportar.'); // Mensaje de agradecimiento
    } catch (error) {
      console.error('Error al enviar el reporte:', error);
      alert('Error al enviar el reporte.');
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!actividad) {
    return <div className="error-message">No se encontró la actividad</div>;
  }

  return (
    <div className="actividad-detalle-page">
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">{actividad.nombre_actividad}</h1>

        {actividad.imagenes && actividad.imagenes.length > 0 && (
          <Carousel className="actividad-detalle-carousel mb-4">
            {actividad.imagenes.map((imagen, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 actividad-imagen"
                  src={`http://localhost:4000/uploads/${imagen}`}
                  alt={`Imagen de ${actividad.nombre_actividad}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}

        {/* Información de la actividad */}
        <div className="actividad-info">
          <p><strong>Organización a Cargo:</strong> {actividad.organizacion_a_cargo}</p>
          <p><strong>Tipo de voluntariado:</strong> {actividad.categoria}</p>
          <p><strong>Dirección:</strong> {actividad.direccion}</p>
          <p><strong>Requisitos:</strong> {actividad.requisitos}</p>
          <p><strong>Fecha Inicio:</strong> {new Date(actividad.fecha_inicio).toLocaleDateString()}</p>
          <p><strong>Fecha Fin:</strong> {new Date(actividad.fecha_fin).toLocaleDateString()}</p>
          <p><strong>Descripción:</strong> {actividad.descripcion}</p>
        </div>

        <div className="text-center mt-4">
          <Button variant="primary" onClick={handlePostular} className="mx-2">
            Postular
          </Button>

          {mensaje && (
            <Alert variant="info" className="mt-3 text-center">
              {mensaje}
            </Alert>
          )}

          {voluntarioRolId === 2 && (
            <Button variant="danger" onClick={handleEliminar} className="mx-2">
              Eliminar Actividad
            </Button>
          )}

          {voluntarioRolId === 3 && voluntarioId === actividad.organizacion_id && (
            <Button variant="dark" onClick={irActualizarActividad} className="mx-2">
              Actualizar
            </Button>
          )}

          {/* Botón para abrir el modal de reporte */}
          <Button variant="warning" onClick={() => setShowModal(true)} className="mx-2">
            Reportar
          </Button>
        </div>

        {/* Modal para reportar */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Reportar Actividad</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="categoriaSelect">
                <Form.Label>Selecciona una categoría</Form.Label>
                <Form.Control
                  as="select"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="">Seleccione...</option>
                  <option value="Inapropiado">Inapropiado</option>
                  <option value="Spam">Spam</option>
                  <option value="Engañoso">Engañoso</option>
                  <option value="Otros">Otros</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="motivoTextarea" className="mt-3">
                <Form.Label>Motivo</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ingresa el motivo del reporte"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleReportar}>
              Reportar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ActividadDetalle;
