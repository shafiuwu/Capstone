import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ActualizarOrganizacion = () => {
  const [organizacion, setOrganizacion] = useState({
    nombre: '',
    tipo_organizacion: '',
    contacto_email: '',
    contacto_telefono: '',
    descripcion: '',
    contrasena: '', // Campo para manejar la contraseña
    foto_empresa: '' // Inicializar con una cadena vacía
  });

  const [mensaje, setMensaje] = useState('');
  const [file, setFile] = useState(null); // Para manejar el archivo de imagen

  useEffect(() => {
    const obtenerOrganizacion = async () => {
      try {
        const response = await axios.get('http://localhost:4000/organizacion', { withCredentials: true });
        setOrganizacion(response.data);
      } catch (error) {
        console.error('Error al obtener la organización:', error);
      }
    };
    obtenerOrganizacion();
  }, []);

  // Manejar el cambio de los inputs
  const handleChange = (e) => {
    setOrganizacion({
      ...organizacion,
      [e.target.name]: e.target.value
    });
  };

  // Manejar el cambio de archivo
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Enviar los datos actualizados al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('nombre', organizacion.nombre);
    formData.append('tipo_organizacion', organizacion.tipo_organizacion);
    formData.append('contacto_email', organizacion.contacto_email);
    formData.append('contacto_telefono', organizacion.contacto_telefono);
    formData.append('descripcion', organizacion.descripcion);
    
    // Solo agregar la nueva contraseña si el campo no está vacío
    if (organizacion.contrasena) {
      formData.append('contrasena', organizacion.contrasena);
    }

    // Solo agregar la nueva foto si se ha seleccionado un archivo
    if (file) {
      formData.append('foto_empresa', file);
    } else {
      // Si no hay un nuevo archivo, agregar el nombre de la imagen existente
      formData.append('foto_empresa', organizacion.foto_empresa);
    }

    try {
      await axios.put('http://localhost:4000/organizaciones/actualizar', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data' // Especificar el tipo de contenido para enviar archivos
        }
      });
      setMensaje('Organización actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar la organización:', error);
      setMensaje('Hubo un error al actualizar la organización');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Actualizar Organización</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={organizacion.nombre}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo de Organización:</label>
          <input
            type="text"
            name="tipo_organizacion"
            value={organizacion.tipo_organizacion}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email de Contacto:</label>
          <input
            type="email"
            name="contacto_email"
            value={organizacion.contacto_email}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono de Contacto:</label>
          <input
            type="text"
            name="contacto_telefono"
            value={organizacion.contacto_telefono}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <textarea
            name="descripcion"
            value={organizacion.descripcion}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña (opcional):</label>
          <input
            type="password"
            name="contrasena"
            placeholder="Ingrese nueva contraseña (si desea cambiarla)"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Foto de la Organización (dejar vacío para mantener la actual):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control"
          />
          {organizacion.foto_empresa && <p className="mt-2">Imagen actual: {organizacion.foto_empresa}</p>} {/* Mostrar la imagen actual */}
        </div>
        <button type="submit" className="btn btn-primary">Actualizar Organización</button>
      </form>
    </div>
  );
};

export default ActualizarOrganizacion;
