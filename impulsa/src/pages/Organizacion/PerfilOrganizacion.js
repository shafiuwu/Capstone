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

  // Construir la URL de la imagen de perfil
  const imageUrl = perfil.foto_empresa ? `http://localhost:4000/uploads/${perfil.foto_empresa}` : null;

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: "600px", width: "100%" }}>
        <div className="row g-0">
          {/* Foto de perfil centrada en la columna izquierda */}
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img 
              src={imageUrl} 
              alt="Foto de perfil" 
              className="img-fluid rounded-circle" 
              style={{ maxWidth: "150px" }} 
            />
          </div>
          {/* Información del perfil */}
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">Bienvenido {perfil.nombre}</h3>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item"><strong>Nombre:</strong> {perfil.nombre}</li>
                <li className="list-group-item"><strong>Tipo Organización:</strong> {perfil.tipo_organizacion}</li>
                <li className="list-group-item"><strong>Correo:</strong> {perfil.contacto_email}</li>
                <li className="list-group-item"><strong>Teléfono:</strong> {perfil.contacto_telefono}</li>
                <li className="list-group-item"><strong>Descripción:</strong> {perfil.descripcion}</li>
                <li className="list-group-item"><strong>Estado:</strong> 
                  <span className={`badge ${perfil.verificado ? "bg-success" : "bg-secondary"}`}>
                    {perfil.verificado ? "Verificado" : "No Verificado"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-primary" onClick={irAActualizarOrganizacion}>Actualizar Información</button>
      </div>      <div className="mt-3">
        <button className="btn btn-primary" onClick={irListarActividades}>Ver postulantes</button>
      </div>
    </div>
  );
};

export default PerfilOrganizacion;
