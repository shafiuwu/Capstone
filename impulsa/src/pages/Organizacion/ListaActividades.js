import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'; 

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
                console.log(data)
            } catch (error) {
                setError('Error al obtener postulaciones'); 
            } finally {
                setLoading(false);
            }
        };

        fetchPostulaciones();
    }, []);

    const handleDecision = async (id, decision, email, actividadNombre) => {
        try {
            await axios.post(`http://localhost:4000/postulantes/decidir`, {
                id: id,
                decision: decision === 'aceptar' ? 'ACEPTADO' : 'RECHAZADO',
                emailVoluntario: email,
                actividadNombre: actividadNombre
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
        <div>
            <Navbar />
            <div className="container mt-4">
                <h2 className="text-center mb-4 display-6">Postulaciones</h2>
                {postulaciones.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Organización</th>
                                    <th>Nombre Actividad</th>
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
                                    <td>{postulante.nombre_actividad}</td>
                                    <td>{postulante.estado}</td>
                                    <td>
                                        <button 
                                            className="btn btn-success me-2" 
                                            onClick={() => handleDecision(postulante.id, 'aceptar', postulante.correo, postulante.nombre_actividad)} // Añadir correo aquí
                                        >
                                            Aceptar
                                        </button>
                                        <button 
                                            className="btn btn-danger" 
                                            onClick={() => handleDecision(postulante.id, 'rechazar', postulante.correo, postulante.nombre_actividad)} // Añadir correo aquí
                                        >
                                            Rechazar
                                        </button>
                                        <div className="card-footer text-center">
                                            <Link to={`/voluntario/${postulante.voluntario_id}`} className="btn btn-primary">
                                                Ver Detalles
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center fst-italic">No hay postulaciones.</p>
                )}
            </div>
        </div>
    );
};

export default Postulaciones;   
