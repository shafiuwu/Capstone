import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';


const PerfilOrganizacion = () => {
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchPerfil = async () => {
    try {
      const response = await axios.get('http://localhost:4000/organizaciones/perfil', { withCredentials: true });
      setPerfil(response.data);
    } catch (err) {
      console.error('Error al obtener el perfil:', err);
      if (err.response?.status === 401) {
        alert("Error, inicie sesión");
        navigate('/login-organizacion');
      } else {
        setError(err.response?.data?.message || 'Error al obtener el perfil');
      }
    }
  };
  const irAActualizarOrganizacion = () => {
    navigate('/actualizar-organizacion');
  };
  const irListarActividades = () => {
    navigate('/listar-postulaciones');
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

  const imageUrl = perfil.foto_empresa ? `http://localhost:4000/uploads/${perfil.foto_empresa}` : null;

  return (
    <div>
      <Navbar />
      <div className="container mt-5 p-4 rounded shadow profile-container">
        <div className="row align-items-center">
          {/* Imagen de perfil */}
          <div className="col-md-4 d-flex justify-content-center">
            <img
              src={imageUrl}
              alt="Foto de perfil"
              className="img-fluid rounded-circle shadow-lg profile-picture"
            />
          </div>

          {/* Información de la organización */}
          <div className="col-md-8">
            <div className="profile-details">
              <h1 className="display-5 mb-4">Bienvenido, {perfil.nombre}</h1>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Nombre:</strong> {perfil.nombre}
                </li>
                <li className="list-group-item">
                  <strong>Tipo de Organización:</strong> {perfil.tipo_organizacion}
                </li>
                <li className="list-group-item">
                  <strong>Correo:</strong> {perfil.contacto_email}
                </li>
                <li className="list-group-item">
                  <strong>Teléfono:</strong> {perfil.contacto_telefono}
                </li>
                <li className="list-group-item">
                  <strong>Descripción:</strong> {perfil.descripcion}
                </li>
                <li className="list-group-item">
                  <strong>Estado:</strong>
                  <span
                    className={`badge ms-2 ${
                      perfil.verificado ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {perfil.verificado ? "Verificado" : "No Verificado"}
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
            onClick={irAActualizarOrganizacion}
          >
            Actualizar Información
          </button>
          <button
            className="btn btn-perfil shadow-sm"
            onClick={irListarActividades}
          >
            Ver Postulantes
          </button>
        </div>
      </div>
    </div>

  );
};

export default PerfilOrganizacion;
