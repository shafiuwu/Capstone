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
        <div className="container mt-4">
            <Navbar />
            <h2 className="text-center mb-4">Actividades por Organización</h2>
            {actividades.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
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
                                    <td>{actividad.fecha_inicio}</td>
                                    <td>{actividad.fecha_fin}</td>
                                    <td>{actividad.descripcion}</td>
                                    <td>
                                        <Link to={`/actividades/${actividad.id}`} className="btn btn-primary me-2">
                                            Ver Detalles
                                        </Link>
                                        <td>
                                        <button 
                                            className="btn btn-success me-2" 
                                            onClick={() => handleHabilitarDiploma(actividad.id, 'ACEPTADO')}
                                        >
                                            Habilitar Diploma
                                        </button>
                                        </td>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center">No hay actividades.</p>
            )}
        </div>
    );
};

export default Actividades;
