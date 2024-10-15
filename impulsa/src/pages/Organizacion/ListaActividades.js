import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const obtenerPostulaciones = async () => {
    try {
        const response = await axios.get(`http://localhost:4000/obtenerPostulaciones`, {
            withCredentials: true,
        });
        return response.data; 
    } catch (error) {
        console.error("Error al obtener postulaciones:", error);
        throw error;
    }
};

const Postulaciones = () => {
    const [postulaciones, setPostulaciones] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchPostulaciones = async () => {
            try {
                const data = await obtenerPostulaciones();
                setPostulaciones(data); 
            } catch (error) {
                setError('Error al obtener postulaciones'); 
            } finally {
                setLoading(false);
            }
        };

        fetchPostulaciones();
    }, []);

    const handleDecision = async (id, decision) => {
        try {
            await axios.post(`http://localhost:4000/postulantes/decidir`, {
                id: id,
                decision: decision === 'aceptar' ? 'ACEPTADO' : 'RECHAZADO',
            });

        } catch (error) {
            console.error(`Error al ${decision === 'aceptar' ? 'aceptar' : 'rechazar'} la postulación:`, error);
        }
    };

    if (loading) {
        return <div className="text-center">Cargando postulaciones...</div>; 
    }

    if (error) {
        return <div className="text-danger text-center">{error}</div>; 
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Postulaciones</h2>
            {postulaciones.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Organización</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postulaciones.map((postulante) => (
                                <tr key={postulante.id}>
                                    <td>{postulante.nombre} {postulante.apellido}</td>
                                    <td>{postulante.correo}</td>
                                    <td>{postulante.nombre_organizacion}</td>
                                    <td>{postulante.estado}</td>
                                    <td>
                                        <button 
                                            className="btn btn-success me-2" 
                                            onClick={() => handleDecision(postulante.id, 'aceptar')}
                                        >
                                            Aceptar
                                        </button>
                                        <button 
                                            className="btn btn-danger" 
                                            onClick={() => handleDecision(postulante.id, 'rechazar')}
                                        >
                                            Rechazar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center">No hay postulaciones.</p>
            )}
        </div>
    );
};

export default Postulaciones;
