import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ActualizarVoluntario = () => {
  const [voluntario, setVoluntario] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    telefono: '',
    fecha_nacimiento: '',
    direccion: '', 
    habilidades: '',
    estado: 'activo', 
    foto_perfil: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [file, setFile] = useState(null); // Para manejar el archivo de imagen

  useEffect(() => {
    const obtenerVoluntario = async () => {
      try {
        const response = await axios.get('http://localhost:4000/voluntario', { withCredentials: true });
        const data = response.data;

        // Formatear la fecha de nacimiento a dd-mm-yyyy
        const formattedFecha = formatFecha(data.fecha_nacimiento);
        
        setVoluntario({
          ...data,
          fecha_nacimiento: formattedFecha // Asignar la fecha formateada
        });
      } catch (error) {
        console.error('Error al obtener el voluntario:', error);
      }
    };
    obtenerVoluntario();
  }, []);

  // Función para formatear la fecha
  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  };

  // Manejar el cambio de los inputs
  const handleChange = (e) => {
    setVoluntario({
      ...voluntario,
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
    formData.append('nombre', voluntario.nombre);
    formData.append('apellido', voluntario.apellido);
    formData.append('correo', voluntario.correo);
    formData.append('telefono', voluntario.telefono);
    formData.append('fecha_nacimiento', voluntario.fecha_nacimiento);
    formData.append('direccion', voluntario.direccion);
    formData.append('habilidades', voluntario.habilidades);
    formData.append('estado', voluntario.estado);

    // Solo añadir la contraseña si se ha proporcionado
    if (voluntario.contrasena) {
      formData.append('contrasena', voluntario.contrasena);
    }

    if (file) {
      formData.append('foto_perfil', file);
    } else {
      // Si no hay un nuevo archivo, agregar el nombre de la imagen existente
      formData.append('foto_perfil', voluntario.foto_perfil);
    }

    try {
      await axios.put('http://localhost:4000/voluntarios/actualizar', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMensaje('Voluntario actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar el voluntario:', error);
      setMensaje('Hubo un error al actualizar el voluntario');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Actualizar Voluntario</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={voluntario.nombre}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={voluntario.apellido}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="correo"
            value={voluntario.correo}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={voluntario.telefono}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Nacimiento:</label>
          <input
            type="text" // Cambiar a texto para mostrar el formato dd-mm-yyyy
            name="fecha_nacimiento"
            value={voluntario.fecha_nacimiento}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={voluntario.direccion}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Habilidades:</label>
          <textarea
            name="habilidades"
            value={voluntario.habilidades}
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
          <label className="form-label">Estado:</label>
          <select
            name="estado"
            value={voluntario.estado}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Foto de Perfil (dejar vacío para mantener la actual):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control"
          />
          {voluntario.foto_perfil && <p className="mt-2">Imagen actual: {voluntario.foto_perfil}</p>} {/* Mostrar la imagen actual */}
        </div>
        <button type="submit" className="btn btn-primary">Actualizar Voluntario</button>
      </form>
    </div>
  );
};

export default ActualizarVoluntario;
