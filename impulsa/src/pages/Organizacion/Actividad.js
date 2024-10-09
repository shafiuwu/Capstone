import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

const AgregarOportunidad = () => {

  const [nombre_actividad, setNombreActividad] = useState('');
  const [organizacion_a_cargo, setOrganizacion] = useState('');
  const [direccion, setDireccion] = useState('');
  const [requisitos, setRequisitos] = useState('');
  const [fecha_inicio, setFechaInicio] = useState('');
  const [fecha_fin, setFechaFin] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('nombre_actividad', nombre_actividad);
    formData.append('organizacion_a_cargo', organizacion_a_cargo);
    formData.append('direccion', direccion);
    formData.append('requisitos', requisitos);
    formData.append('fecha_inicio', fecha_inicio);
    formData.append('fecha_fin', fecha_fin);
    formData.append('descripcion', descripcion);

    if (imagenes) {
      for (let i = 0; i < imagenes.length; i++) {
        formData.append('imagenes', imagenes[i]);
      }
    }

    try {
      const response = await axios.post('http://localhost:4000/actividades', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMensaje(response.data.message || 'Actividad creada correctamente'); // Asegúrate de que tu backend devuelva un mensaje
      // Puedes hacer algo más, como redirigir o limpiar el formulario
    } catch (error) {
      console.error('Error al agregar la oportunidad:', error);
      setMensaje('Error al agregar la oportunidad.'); // Mensaje de error
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Agregar Oportunidad de Voluntariado</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombreActividad" className="form-label">Nombre de la actividad</label>
            <input type="text" className="form-control" id="nombre_actividad" required onChange={(e) => setNombreActividad(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="organizacion" className="form-label">Organización a cargo</label>
            <input type="text" className="form-control" id="organizacion_a_cargo" required onChange={(e) => setOrganizacion(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">Dirección</label>
            <input type="text" className="form-control" id="direccion" required onChange={(e) => setDireccion(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="requisitos" className="form-label">Requisitos</label>
            <textarea className="form-control" id="requisitos" rows="3" required onChange={(e) => setRequisitos(e.target.value)}></textarea>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="fechaInicio" className="form-label">Fecha de inicio</label>
              <input type="date" className="form-control" id="fecha_inicio" required onChange={(e) => setFechaInicio(e.target.value)} />
            </div>
            <div className="col">
              <label htmlFor="fechaFin" className="form-label">Fecha de fin</label>
              <input type="date" className="form-control" id="fecha_fin" required onChange={(e) => setFechaFin(e.target.value)} />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea className="form-control" id="descripcion" rows="4" required onChange={(e) => setDescripcion(e.target.value)}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="imagenes" className="form-label">Imágenes</label>
            <input type="file" className="form-control" id="imagenes" multiple onChange={(e) => setImagenes(e.target.files)} />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Agregar Oportunidad</button>
          </div>
          {mensaje && <div className="mt-3 text-center">{mensaje}</div>} {/* Mensaje de éxito o error */}
        </form>
      </div>
    </div>
  );
};

export default AgregarOportunidad;
