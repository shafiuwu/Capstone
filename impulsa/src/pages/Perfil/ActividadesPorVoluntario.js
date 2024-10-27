import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../components/Navbar';

const obtenerActividadesPorOrganizacion = async () => {
    try {
        const response = await axios.get(`http://localhost:4000/voluntario/actividades`, {
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
    } catch (error) {
        console.error('Error al habilitar el diploma:', error);
    }
};

// Función para descargar el diploma
const descargarDiploma = async (voluntarioId, actividadId) => {
    try {
        const response = await axios.get(`http://localhost:4000/diploma/${voluntarioId}/${actividadId}`, {
            responseType: 'blob'  // Indica que la respuesta es un archivo
        });

        // Crear un enlace de descarga y hacer que el navegador descargue el archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `diploma_${voluntarioId}_${actividadId}.pdf`); // Puedes ajustar el nombre del archivo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error al descargar el diploma:', error);
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
            <p className="text-center mb-4">En caso de fallo vuelva a interta descargar</p>
            {actividades.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Nombre de la Actividad</th>
                                <th>Fecha Inicio</th>
                                <th>Fecha Final</th>
                                <th>Descripción</th>
                                <th>Diploma</th>
                            </tr>
                        </thead>
                        <tbody>
                            {actividades.map((inscripcion) => (
                                <tr key={inscripcion.id}>
                                    <td>{inscripcion.nombre_actividad}</td>
                                    <td>{inscripcion.fecha_inicio}</td>
                                    <td>{inscripcion.fecha_fin}</td>
                                    <td>{inscripcion.descripcion}</td>
                                    <td>
                                        {inscripcion.habilitar_diploma === 'HABILITADO' ? (
                                            <button 
                                                className="btn btn-primary"
                                                onClick={() => descargarDiploma(inscripcion.voluntario_id, inscripcion.actividad_id)}
                                            >
                                                Descargar Diploma
                                            </button>
                                        ) : (
                                            <p className="text-center">Aun no disponible</p>
                                        )}
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
