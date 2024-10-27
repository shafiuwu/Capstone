import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../components/Navbar';

const obtenerReportes = async () => {
    try {
        const response = await axios.get(`http://localhost:4000/verReportes`, {
            withCredentials: true,
        });
        return response.data; 
    } catch (error) {
        console.error("Error al obtener reportes:", error);
        throw error;
    }
};

const Reportes = () => {
    const [reportes, setReportes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchReportes = async () => {
            try {
                const data = await obtenerReportes();
                setReportes(data); 
            } catch (error) {
                setError('Error al obtener reportes'); 
            } finally {
                setLoading(false);
            }
        };

        fetchReportes();
    }, []);

    
    const handleDecision = async (id, decision) => {
        try {
            await axios.post(`http://localhost:4000/reporte/decidir`, {
                id: id,
                decision: decision === 'aceptar' ? 'ACEPTADO' : 'RECHAZADO',
            });

        } catch (error) {
            console.error(`Error al ${decision === 'aceptar' ? 'aceptar' : 'rechazar'} el reporte:`, error);
        }
    };

    if (loading) {
        return <div className="text-center">Cargando reportes...</div>; 
    }

    if (error) {
        return <div className="text-danger text-center">{error}</div>; 
    }

    return (
        <div className="container mt-4">
            <Navbar />
            <h2 className="text-center mb-4">Reportes</h2>
            {reportes.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Actividad</th>
                                <th>Organización</th>
                                <th>Categoría</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportes.map((reporte) => (
                                <tr key={reporte.id}>
                                    <td>{reporte.nombre_actividad}</td>
                                    <td>{reporte.organizacion_a_cargo}</td>
                                    <td>{reporte.categoria}</td>
                                    <td>{reporte.descripcion}</td>
                                    <td>{reporte.estado ? 'Revisado' : 'Pendiente'}</td>
                                    <td>
                                        <Link to={`/actividades/${reporte.id_actividad}`}>
                                            <button className="btn btn-primary">
                                                Ver Actividad
                                            </button>
                                        </Link>
                                        <button 
                                            className="btn btn-success me-2" 
                                            onClick={() => handleDecision(reporte.id, 'aceptar')}
                                        >
                                            Revisado
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center">No hay reportes disponibles.</p>
            )}
        </div>
    );
};

export default Reportes;
