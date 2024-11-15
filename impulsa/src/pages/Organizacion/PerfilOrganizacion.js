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
  <div className="container-fluid mt-5">
    <div className="row g-4">
      {/* Imagen de perfil en la columna izquierda */}
      <div className="col-md-3 d-flex justify-content-center align-items-start">
        <img 
          src={imageUrl} 
          alt="Foto de perfil" 
          className="img-fluid rounded-circle border border-3 border-primary" 
          style={{ width: "180px", height: "180px", objectFit: "cover" }}
        />
      </div>

      {/* Información de la organización en la columna derecha */}
      <div className="col-md-9">
        <div className="px-4">
          <h1 className="display-5 mb-3">Bienvenido, {perfil.nombre}</h1>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Nombre:</strong> {perfil.nombre}</li>
            <li className="list-group-item"><strong>Tipo de Organización:</strong> {perfil.tipo_organizacion}</li>
            <li className="list-group-item"><strong>Correo:</strong> {perfil.contacto_email}</li>
            <li className="list-group-item"><strong>Teléfono:</strong> {perfil.contacto_telefono}</li>
            <li className="list-group-item"><strong>Descripción:</strong> {perfil.descripcion}</li>
            <li className="list-group-item">
              <strong>Estado:</strong> 
              <span className={`badge ${perfil.verificado ? "bg-success" : "bg-secondary"} ms-2`}>
                {perfil.verificado ? "Verificado" : "No Verificado"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Botones de acción en la parte inferior, alineados a la izquierda */}
    <div className="d-flex justify-content-center mt-4 px-4">
      <button className="btn btn-outline-primary me-2" onClick={irAActualizarOrganizacion}>Actualizar Información</button>
      <button className="btn btn-outline-primary" onClick={irListarActividades}>Ver Postulantes</button>
    </div>
  </div>
</div>

  );
};

export default PerfilOrganizacion;
