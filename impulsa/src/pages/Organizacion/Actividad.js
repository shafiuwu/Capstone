import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

const AgregarOportunidad = () => {
    const [nombre_actividad, setNombreActividad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [requisitos, setRequisitos] = useState('');
    const [fecha_inicio, setFechaInicio] = useState('');
    const [fecha_fin, setFechaFin] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenes, setImagenes] = useState(null);
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('nombre_actividad', nombre_actividad);
        formData.append('direccion', direccion);
        formData.append('requisitos', requisitos);
        formData.append('fecha_inicio', fecha_inicio);
        formData.append('fecha_fin', fecha_fin);
        formData.append('descripcion', descripcion);
        formData.append('categoria', categoria);

        if (imagenes) {
            for (let i = 0; i < imagenes.length; i++) {
                formData.append('imagenes', imagenes[i]);
            }
        }

        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='));
            const tokenValue = token ? token.split('=')[1] : null;

            const response = await axios.post('http://localhost:4000/actividades', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            setMensaje(response.data.message || 'Actividad creada correctamente');
        } catch (error) {
            console.error('Error al agregar la oportunidad:', error);
            setMensaje('Error al agregar la oportunidad.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="d-flex align-items-center mb-4">
                <button 
                className="btn btn-outline-secondary me-3"
                onClick={() => window.history.back()}
                title="Volver"
                >
                <i className="bi bi-arrow-left"></i> 
                </button>
                <h2 className="display-6 text-center w-100"
                style={{paddingBottom: "20px"}}>
                    Agregar Oportunidad de Voluntariado
                </h2>
                </div>

                {/* Formulario */}
                <form
                onSubmit={handleSubmit}
                className="bg-light p-4 shadow rounded"
                style={{ maxWidth: "800px", margin: "0 auto" }}
                >
                <div className="mb-3">
                    <label htmlFor="nombreActividad" className="form-label fw-bold">
                    Nombre de la actividad
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="nombre_actividad"
                    placeholder="Ej: Taller de Reciclaje"
                    required
                    onChange={(e) => setNombreActividad(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label fw-bold">
                    Dirección
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="direccion"
                    placeholder="Ej: Calle Principal #123"
                    required
                    onChange={(e) => setDireccion(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="requisitos" className="form-label fw-bold">
                    Requisitos
                    </label>
                    <textarea
                    className="form-control"
                    id="requisitos"
                    rows="3"
                    placeholder="Ej: Ser mayor de 18 años, conocimientos básicos en reciclaje"
                    required
                    onChange={(e) => setRequisitos(e.target.value)}
                    ></textarea>
                </div>
                <div className="row mb-3">
                    <div className="col">
                    <label htmlFor="fechaInicio" className="form-label fw-bold">
                        Fecha de inicio
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha_inicio"
                        required
                        onChange={(e) => setFechaInicio(e.target.value)}
                    />
                    </div>
                    <div className="col">
                    <label htmlFor="fechaFin" className="form-label fw-bold">
                        Fecha de fin
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha_fin"
                        required
                        onChange={(e) => setFechaFin(e.target.value)}
                    />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="categoria" className="form-label fw-bold">
                    Categoría
                    </label>
                    <select
                    id="categoria"
                    name="categoria"
                    className="form-select"
                    required
                    onChange={(e) => setCategoria(e.target.value)}
                    >
                    <option value="">Seleccione una categoría</option>
                    <option value="Educación y Capacitación">
                        Educación y Capacitación
                    </option>
                    <option value="Salud y Bienestar">Salud y Bienestar</option>
                    <option value="Medioambiente y Sostenibilidad">
                        Medioambiente y Sostenibilidad
                    </option>
                    <option value="Desarrollo Comunitario">
                        Desarrollo Comunitario
                    </option>
                    <option value="Apoyo Social">Apoyo Social</option>
                    <option value="Protección Animal">Protección Animal</option>
                    <option value="Cultura y Arte">Cultura y Arte</option>
                    <option value="Tecnología y Comunicación">
                        Tecnología y Comunicación
                    </option>
                    <option value="Derechos Humanos y Justicia">
                        Derechos Humanos y Justicia
                    </option>
                    <option value="Deporte y Recreación">Deporte y Recreación</option>
                    <option value="Ayuda en Desastres y Emergencias">
                        Ayuda en Desastres y Emergencias
                    </option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label fw-bold">
                    Descripción
                    </label>
                    <textarea
                    className="form-control"
                    id="descripcion"
                    rows="4"
                    placeholder="Detalle de la actividad, objetivos y tareas a realizar"
                    required
                    onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="imagenes" className="form-label fw-bold">
                    Imágenes
                    </label>
                    <input
                    type="file"
                    className="form-control"
                    id="imagenes"
                    multiple
                    onChange={(e) => setImagenes(e.target.files)}
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-md">
                    Agregar Oportunidad
                    </button>
                </div>
                {mensaje && (
                    <div className="alert alert-success mt-3 text-center">{mensaje}</div>
                )}
                </form>
            </div>
        </div>
    );
};

export default AgregarOportunidad;
