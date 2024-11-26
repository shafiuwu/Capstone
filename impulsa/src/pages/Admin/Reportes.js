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
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-center flex-grow-1 display-6">Reportes</h2>
                </div>
                {reportes.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                    <thead className="table-dark text-center">
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
                        <tr key={reporte.id} className="text-center">
                            <td>{reporte.nombre_actividad}</td>
                            <td>{reporte.organizacion_a_cargo}</td>
                            <td>{reporte.categoria}</td>
                            <td className="text-wrap" style={{ maxWidth: "300px" }}>
                                {reporte.descripcion}
                            </td>
                            <td>
                            <span
                                className={`badge ${
                                reporte.estado ? "bg-success" : "bg-warning text-dark"
                                }`}
                            >
                                {reporte.estado ? "Revisado" : "Pendiente"}
                            </span>
                            </td>
                            <td className="text-center">
                            <div className="d-flex justify-content-center gap-2">
                                <Link to={`/actividades/${reporte.id_actividad}`}>
                                <button className="btn btn-primary btn-sm">
                                    Ver Actividad
                                </button>
                                </Link>
                                <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleDecision(reporte.id, "aceptar")}
                                >
                                Revisado
                                </button>
                            </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                ) : (
                <div className="alert alert-info text-center mt-4">
                    No hay reportes disponibles.
                </div>
                )}
            </div>
        </div>

    );
};

export default Reportes;
