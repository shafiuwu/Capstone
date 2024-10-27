import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';


const PerfilVoluntario = () => {
  const { voluntarioId } = useParams();
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
      const response = await axios.get(`http://localhost:4000/voluntario/${voluntarioId}`);
      setPerfil(response.data);
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
      <div className="container mt-5 d-flex flex-column align-items-center">
        <div className="card p-4 shadow-sm" style={{ maxWidth: "600px", width: "100%" }}>
          <div className="row g-0">
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              <img 
                src={imageUrl}
                alt="Foto de perfil" 
                className="img-fluid rounded-circle" 
                style={{ maxWidth: "150px" }} 
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">Bienvenido, {capitalizarPrimeraLetra(perfil.nombre)}</h3>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item"><strong>Nombre:</strong> {capitalizarPrimeraLetra(perfil.nombre)}</li>
                  <li className="list-group-item"><strong>Apellido:</strong> {capitalizarPrimeraLetra(perfil.apellido)}</li>
                  <li className="list-group-item"><strong>Correo:</strong> {perfil.correo}</li>
                  <li className="list-group-item"><strong>Teléfono:</strong> {perfil.telefono}</li>
                  <li className="list-group-item"><strong>Fecha de Nacimiento:</strong> {formatearFecha(perfil.fecha_nacimiento)}</li>
                  <li className="list-group-item"><strong>Dirección:</strong> {capitalizarPrimeraLetra(perfil.direccion)}</li>
                  <li className="list-group-item"><strong>Habilidades:</strong> {capitalizarPrimeraLetra(perfil.habilidades)}</li>
                  <li className="list-group-item"><strong>Preferencia de voluntariado:</strong> {capitalizarPrimeraLetra(perfil.tipo)}</li>
                  <li className="list-group-item">
                    <strong>Estado:</strong> 
                    <span className={`badge ${perfil.estado ? "bg-success" : "bg-secondary"}`}>
                      {perfil.estado ? "Activo" : "Inactivo"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilVoluntario;
