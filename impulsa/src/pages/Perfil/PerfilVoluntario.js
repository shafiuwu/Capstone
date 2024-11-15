import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

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
        <div className="container-fluid mt-5">
          <div className="row g-4">
            {/* Imagen de perfil en una columna */}
            <div className="col-md-3 d-flex justify-content-center align-items-center">
              <img 
                src={imageUrl} 
                alt="Foto de perfil" 
                className="img-fluid rounded-circle border border-3 border-primary" 
                style={{ width: "210px", height: "210px", objectFit: "cover" }}
              />
            </div>

            {/* Información de perfil en una columna más amplia */}
            <div className="col-md-9">
              <div className="px-4">
                <h1 className="display-5 mb-3">Bienvenido, {capitalizarPrimeraLetra(perfil.nombre)}</h1>
                <ul className="list-group list-group-flush">
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
                    <span className={`badge ${perfil.estado ? "bg-success" : "bg-secondary"} ms-2`}>
                      {perfil.estado ? "Activo" : "Inactivo"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Botones de acción en la parte inferior, con un espacio centralizado */}
          <div className="d-flex justify-content-center mt-4 px-4" style={{marginBottom: "50px"}}>
            <button className="btn btn-outline-primary me-2" onClick={irActualizarVoluntario}>Actualizar Información</button>
            <button className="btn btn-outline-primary me-2" onClick={irVerPostulaciones}>Mis Postulaciones</button>
            {rolId === 2 && (
              <button className="btn btn-outline-primary" onClick={irVerReportes}>Ver Reportes</button>
            )}
          </div>
        </div>
      </div>

  );
};

export default PerfilVoluntario;
