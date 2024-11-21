const { generarDiploma } = require('../services/diploma.services');
const db = require('../db');

const generarDiplomaHandler = async (req, res) => {
    try {
        const { voluntarioId, actividadId } = req.params;

        const result = await db.query(`
            SELECT ins.id, 
                   ins.actividad_id, 
                   ins.voluntario_id, 
                   vol.nombre AS nombre_voluntario, 
                   vol.apellido AS apellido_voluntario,
                   ins.organizacion_id,
                   org.nombre AS nombre_organizacion,
                   act.nombre_actividad
            FROM inscripciones ins
            JOIN voluntarios vol ON ins.voluntario_id = vol.id
            JOIN empresa org ON ins.organizacion_id = org.id
            JOIN actividades act ON ins.actividad_id = act.id
            WHERE ins.voluntario_id = $1 AND ins.actividad_id = $2
        `, [voluntarioId, actividadId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontró la inscripción o los datos correspondientes' });
        }

        const { nombre_voluntario, apellido_voluntario, nombre_organizacion, nombre_actividad } = result.rows[0];

        const NombreCompleto = `${nombre_voluntario} ${apellido_voluntario}`;
        const rutaDiploma = generarDiploma(NombreCompleto, nombre_actividad, nombre_organizacion);

        res.download(rutaDiploma, `${NombreCompleto}_diploma.pdf`);
    } catch (error) {
        console.error('Error al generar el diploma:', error);
        res.status(500).json({ message: 'Error al generar el diploma' });
    }
};

const estadoDiploma = async (req, res) => {
    const { id, decision } = req.body;

    try {
        const query = `
            UPDATE actividades 
            SET habilitar_diploma = $1 
            WHERE id = $2
            RETURNING *; 
        `;
        
        const estado = decision === 'ACEPTADO' ? 'HABILITADO' : 'NO HABILITADO'; 
        const values = [estado, id];

        console.log("Consulta SQL:", query, "Valores:", values); // Log para depuración

        const result = await db.query(query, values);

        res.status(200).json(result.rows); 
    } catch (error) {
        console.error("Error al decidir sobre el diploma:", error);
        res.status(500).json({ error: "Error al decidir sobre el diploma" });
    }
};

module.exports = { generarDiplomaHandler,
                   estadoDiploma
 };
