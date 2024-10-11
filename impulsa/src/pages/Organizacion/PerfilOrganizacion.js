import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        alert("Error inicie sesion")
        navigate('/login-organizacion');
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

  // Construir la URL de la imagen de perfil
  const imageUrl = perfil.foto_empresa ? `http://localhost:4000/uploads/${perfil.foto_empresa}` : null;

  return (
    <div>
      <h1>Bienvenido {perfil.nombre}</h1>
      <p><strong>Nombre:</strong> {perfil.nombre}</p>
      <p><strong>Tipo Organizacion:</strong> {perfil.tipo_organizacion}</p>
      <p><strong>Correo:</strong> {perfil.contacto_email}</p>
      <p><strong>Teléfono:</strong> {perfil.contacto_telefono}</p>
      <p><strong>descripcion:</strong> {perfil.descripcion}</p>
      <p><strong>Estado:</strong> {perfil.verificado ? "Verificado" : "No Verificado"}</p>
      <p><strong>Foto de Perfil:</strong> {imageUrl && <img src={imageUrl} alt="Foto de perfil" style={{ maxWidth: '200px', borderRadius: '10px' }} />} </p>
    </div>
  );
};

export default PerfilOrganizacion;
