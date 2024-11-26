import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../components/Navbar'

const obtenerPostulaciones = async () => {
    try {
        const response = await axios.get(`http://localhost:4000/verPostulaciones`, {
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

    if (loading) {
        return <div className="text-center">Cargando postulaciones...</div>; 
    }

    if (error) {
        return <div className="text-danger text-center">{error}</div>; 
    }

    return (
        <div style={{minHeight: "100vh"}}>
            <Navbar />
            <div className="container mt-4">
                <h2 className="text-center mb-4 display-5">Postulaciones</h2>
                {postulaciones.length > 0 ? (
                    <div className="table-responsive">
                    <table className="table table-bordered table-hover table-striped table-sm">
                        <thead className="table-dark text-center">
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Organización</th>
                            <th>Nombre Actividad</th>
                            <th>Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {postulaciones.map((postulante, index) => (
                            <tr key={postulante.id} className={index % 2 === 0 ? "bg-light" : ""}>
                            <td>{postulante.nombre} {postulante.apellido}</td>
                            <td>{postulante.correo}</td>
                            <td>{postulante.nombre_organizacion}</td>
                            <td>{postulante.nombre_actividad}</td>
                            <td className="text-center">
                                <span 
                                className={`badge ${
                                    postulante.estado === "Aprobado" ? "bg-success" : 
                                    postulante.estado === "Rechazado" ? "bg-danger" : "bg-secondary"
                                }`}
                                >
                                {postulante.estado}
                                </span>
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
        </div>
    );
};

export default Postulaciones;
