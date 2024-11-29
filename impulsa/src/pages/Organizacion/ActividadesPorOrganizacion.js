import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom'; 

const obtenerActividadesPorOrganizacion = async () => {
    try {
        const response = await axios.get(`http://localhost:4000/actividades/organizacion`, {
            withCredentials: true,
        });
        return response.data; 
    } catch (error) {
        console.error("Error al obtener actividades:", error);
        throw error;
    }
};

const handleHabilitarDiploma = async (id, decision) => {
    try {
        const response = await axios.post(`http://localhost:4000/diploma/habilitar`, { id, decision });
        console.log('Estado del diploma actualizado:', response.data);
        // Puedes agregar lógica para actualizar la lista de inscripciones si es necesario
    } catch (error) {
        console.error('Error al habilitar el diploma:', error);
    }
};


const Actividades = () => {
    const [actividades, setActividades] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchActividades = async () => {
            try {
                const data = await obtenerActividadesPorOrganizacion();
                setActividades(data); 
                console.log(data);
            } catch (error) {
                setError('Error al obtener actividades'); 
            } finally {
                setLoading(false);
            }
        };

        fetchActividades();
    }, []);

    if (loading) {
        return <div className="text-center">Cargando actividades...</div>; 
    }

    if (error) {
        return <div className="text-danger text-center">{error}</div>; 
    }

    return (
        <div>
      <Navbar />
      <div className="container mt-4">
        {/* Encabezado con el botón de regreso */}
        <div className="d-flex align-items-center mb-4">
        <button 
          className="btn btn-outline-secondary me-3"
          onClick={() => window.history.back()}
          title="Volver"
        >
          <i className="bi bi-arrow-left"></i> 
        </button>
          <h2 className="display-6 mb-0 text-center w-100" style={{paddingBottom: "20px"}}>
            Actividades por Organización
          </h2>
        </div>

        {actividades.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-dark text-center">
                <tr>
                  <th>Nombre de la Actividad</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Final</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {actividades.map((actividad) => (
                  <tr key={actividad.id}>
                    <td>{actividad.nombre_actividad}</td>
                    <td className="text-center">
                      {new Date(actividad.fecha_inicio).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      {new Date(actividad.fecha_fin).toLocaleDateString()}
                    </td>
                    <td className="text-wrap">{actividad.descripcion}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          handleHabilitarDiploma(actividad.id, "ACEPTADO")
                        }
                        style={{ marginRight: "10px", marginBottom: "10px"}}
                      >
                        Habilitar Diploma
                      </button>
                      <Link
                        to={`/actividades/${actividad.id}`}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Ver Detalles
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center fst-italic mt-4">
            No hay actividades disponibles.
          </p>
        )}
      </div>
    </div>
    );
};

export default Actividades;
