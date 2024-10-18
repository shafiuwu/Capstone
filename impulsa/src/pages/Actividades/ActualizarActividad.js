import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ActualizarActividad = () => {
  const { actividadId } = useParams();
  const [nombreActividad, setNombreActividad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [requisitos, setRequisitos] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const obtenerActividad = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/actividades/${actividadId}`);
        const actividad = response.data;
        const fechaInicioFormateada = actividad.fecha_inicio ? actividad.fecha_inicio.split('T')[0] : '';
        const fechaFinFormateada = actividad.fecha_fin ? actividad.fecha_fin.split('T')[0] : '';
        setNombreActividad(actividad.nombre_actividad);
        setDireccion(actividad.direccion);
        setRequisitos(actividad.requisitos);
        setFechaInicio(fechaInicioFormateada);
        setFechaFin(fechaFinFormateada);
        setDescripcion(actividad.descripcion);
        setCategoria(actividad.categoria);
        setImagenes(actividad.imagenes || []);
      } catch (error) {
        console.error('Error al cargar los datos de la actividad:', error);
      }
    };

    if (actividadId) {
      obtenerActividad();
    }
  }, [actividadId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre_actividad', nombreActividad);
    formData.append('direccion', direccion);
    formData.append('requisitos', requisitos);
    formData.append('fecha_inicio', fechaInicio);
    formData.append('fecha_fin', fechaFin);
    formData.append('descripcion', descripcion);
    formData.append('categoria', categoria);

    if (imagenes.length > 0) {
      for (let i = 0; i < imagenes.length; i++) {
        formData.append('imagenes', imagenes[i]);
      }
    }

    try {
      const response = await axios.put(`http://localhost:4000/actividades/${actividadId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      setMensaje(response.data.message || 'Actividad actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar la actividad:', error);
      setMensaje('Error al actualizar la actividad.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Actualizar Actividad</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombreActividad" className="form-label">Nombre de la Actividad</label>
          <input type="text" className="form-control" id="nombreActividad" value={nombreActividad} onChange={(e) => setNombreActividad(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input type="text" className="form-control" id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="requisitos" className="form-label">Requisitos</label>
          <textarea className="form-control" id="requisitos" rows="3" value={requisitos} onChange={(e) => setRequisitos(e.target.value)} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="fechaInicio" className="form-label">Fecha de Inicio</label>
          <input type="date" className="form-control" id="fechaInicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaFin" className="form-label">Fecha de Fin</label>
          <input type="date" className="form-control" id="fechaFin" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea className="form-control" id="descripcion" rows="4" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoría</label>
          <select className="form-control" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Selecciona una categoría</option>
            <option value="educacion">Educación</option>
            <option value="salud">Salud</option>
            <option value="medio_ambiente">Medio Ambiente</option>
            <option value="social">Social</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="imagenes" className="form-label">Imágenes (Opcional)</label>
          <input type="file" className="form-control" id="imagenes" multiple onChange={(e) => setImagenes(e.target.files)} />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Actualizar Actividad</button>
        </div>
        {mensaje && <div className="mt-3 text-center">{mensaje}</div>}
      </form>
    </div>
  );
};

export default ActualizarActividad;
