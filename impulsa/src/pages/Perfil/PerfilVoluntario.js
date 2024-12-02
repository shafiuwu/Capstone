import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './Perfil.css';

const PerfilVoluntario = () => {
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState('');
  const [rolId, setRolId] = useState(null);
  const navigate = useNavigate();

  const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  };

  const capitalizarPrimeraLetra = (texto) => {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  };

  const fetchPerfil = async () => {
    try {
      const response = await axios.get('http://localhost:4000/voluntarios/perfil', { withCredentials: true });
      setPerfil(response.data);

      const token = document.cookie.split('=')[1];
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setRolId(decodedToken.rol_id);
      }
    } catch (err) {
      console.error('Error al obtener el perfil:', err);
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Error al obtener el perfil');
      }
    }
  };

  useEffect(() => {
    fetchPerfil();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!perfil) {
    return <div>Cargando perfil...</div>;
  }

  const imageUrl = perfil.foto_perfil ? `http://localhost:4000/uploads/${perfil.foto_perfil}` : null;

  const irActualizarVoluntario = () => {
    navigate('/actualizar-voluntario');
  };

  const irVerPostulaciones = () => {
    navigate('/postulaciones-voluntario');
  };

  const irVerReportes = () => {
    navigate('/ver-reportes');
  };

  return (
    <div>
    <Navbar />
    <div className="container mt-5 p-4 rounded shadow profile-container" style={{marginBottom: "100px"}}>
      <div className="row align-items-center">
        {/* Imagen de perfil */}
        <div className="col-md-4 d-flex justify-content-center">
          <img
            src={imageUrl}
            alt="Foto de perfil"
            className="img-fluid rounded-circle shadow-lg profile-picture"
          />
        </div>
  
        {/* Información del perfil */}
        <div className="col-md-8">
          <div className="profile-details">
            <h1 className="display-5 mb-4">
              Bienvenido, {capitalizarPrimeraLetra(perfil.nombre)}
            </h1>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Nombre:</strong> {capitalizarPrimeraLetra(perfil.nombre)}
              </li>
              <li className="list-group-item">
                <strong>Apellido:</strong> {capitalizarPrimeraLetra(perfil.apellido)}
              </li>
              <li className="list-group-item">
                <strong>Correo:</strong> {perfil.correo}
              </li>
              <li className="list-group-item">
                <strong>Teléfono:</strong> {perfil.telefono}
              </li>
              <li className="list-group-item">
                <strong>Fecha de Nacimiento:</strong> {formatearFecha(perfil.fecha_nacimiento)}
              </li>
              <li className="list-group-item">
                <strong>Dirección:</strong> {capitalizarPrimeraLetra(perfil.direccion)}
              </li>
              <li className="list-group-item">
                <strong>Habilidades:</strong> {capitalizarPrimeraLetra(perfil.habilidades)}
              </li>
              <li className="list-group-item">
                <strong>Preferencia de voluntariado:</strong> {capitalizarPrimeraLetra(perfil.tipo)}
              </li>
              <li className="list-group-item">
                <strong>Estado:</strong>
                <span
                  className={`badge ms-2 ${
                    perfil.estado ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {perfil.estado ? "Activo" : "Inactivo"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
  
      {/* Botones de acción */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-perfil me-2 shadow-sm"
          onClick={irActualizarVoluntario}
        >
          Actualizar Información
        </button>
        <button
          className="btn btn-perfil me-2 shadow-sm"
          onClick={irVerPostulaciones}
        >
          Mis Postulaciones
        </button>
        {rolId === 2 && (
          <button className="btn btn-perfil shadow-sm" onClick={irVerReportes}>
            Ver Reportes
          </button>
        )}
      </div>
    </div>
  </div>
  

  );
};

export default PerfilVoluntario;
