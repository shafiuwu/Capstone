import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PerfilVoluntario = () => {
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchPerfil = async () => {
    try {
      const response = await axios.get('http://localhost:4000/voluntarios/perfil', { withCredentials: true });
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

  // Construir la URL de la imagen de perfil
  const imageUrl = perfil.foto_perfil ? `http://localhost:4000/uploads/${perfil.foto_perfil}` : null;

  return (
    <div>
      <h1>Bienvenido {perfil.nombre}</h1>
      <p><strong>Nombre:</strong> {perfil.nombre}</p>
      <p><strong>Apellido:</strong> {perfil.apellido}</p>
      <p><strong>Correo:</strong> {perfil.correo}</p>
      <p><strong>Teléfono:</strong> {perfil.telefono}</p>
      <p><strong>Fecha de Nacimiento:</strong> {perfil.fecha_nacimiento}</p>
      <p><strong>Dirección:</strong> {perfil.direccion}</p>
      <p><strong>Habilidades:</strong> {perfil.habilidades}</p>
      <p><strong>Estado:</strong> {perfil.estado ? "Activo" : "Inactivo"}</p>
      <p><strong>Foto de Perfil:</strong> {imageUrl && <img src={imageUrl} alt="Foto de perfil" style={{ maxWidth: '200px', borderRadius: '10px' }} />} </p>
    </div>
  );
};

export default PerfilVoluntario;
