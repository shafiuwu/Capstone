import React from "react";
import Navbar from "../../components/Navbar";

const AgregarOportunidad = () => {
    return (
      <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Agregar Oportunidad de Voluntariado</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="nombreActividad" className="form-label">Nombre de la actividad</label>
            <input type="text" className="form-control" id="nombreActividad" name="nombreActividad" required />
          </div>
          <div className="mb-3">
            <label htmlFor="organizacion" className="form-label">Organización a cargo</label>
            <input type="text" className="form-control" id="organizacion" name="organizacion" required />
          </div>
          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">Dirección</label>
            <input type="text" className="form-control" id="direccion" name="direccion" required />
          </div>
          <div className="mb-3">
            <label htmlFor="requisitos" className="form-label">Requisitos</label>
            <textarea className="form-control" id="requisitos" name="requisitos" rows="3" required></textarea>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="fechaInicio" className="form-label">Fecha de inicio</label>
              <input type="date" className="form-control" id="fechaInicio" name="fechaInicio" required />
            </div>
            <div className="col">
              <label htmlFor="fechaFin" className="form-label">Fecha de fin</label>
              <input type="date" className="form-control" id="fechaFin" name="fechaFin" required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea className="form-control" id="descripcion" name="descripcion" rows="4" required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="imagenes" className="form-label">Imágenes</label>
            <input type="file" className="form-control" id="imagenes" name="imagenes" multiple />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Agregar Oportunidad</button>
          </div>
        </form>
      </div>
      </div>
    );
  };
  
  export default AgregarOportunidad;
  