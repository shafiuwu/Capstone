const db = require('../db');
const config = require ('../config')
const { v4: uuidv4 } = require('uuid');

const crearReporte = async (req, res) => {
    const {
        categoria,
        descripcion,
    } = req.body;

    const { actividadId } = req.params; // Obtenemos actividadId de la URL

    const id = uuidv4();

    try {
        const datos = await db.query(
            "INSERT INTO reportes (id, categoria, descripcion, id_actividad) VALUES ($1, $2, $3, $4)",
            [id, categoria, descripcion, actividadId] // Asegúrate de pasar el id de actividad desde req.params
        );

        console.log(datos.rows);
        res.status(201).send('Reporte creado correctamente');
    } catch (error) {
        console.error('Error al crear el reporte:', error);
        res.status(500).send('Error al crear el reporte');
    }
};

const obtenerReportes =  async(req, res) => {
    try{
    todasActividades = await db.query(`select ac.nombre_actividad, ac.organizacion_a_cargo, re.categoria, re.descripcion, re.estado, re.id_actividad
                                       from reportes re
                                       join actividades ac
                                       on ac.id = re.id_actividad`)
    res.json(todasActividades.rows)
    }catch(error){
        console.log(error)
    }
};

const borrarReporte = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const resultado = await db.query('DELETE FROM reportes WHERE id = $1', [id]);
  
      if (resultado.rowCount === 0) {
        return res.status(404).json({
          message: 'Reporte no encontrada'
        });
      }
  
      return res.status(200).json({
        message: 'Reporte eliminada correctamente',
        id: id
      });
    } catch (error) {
      next(error);
    }
  };

  const estadoReporte = async (req, res) => {
    const { id, decision } = req.body;

    try {
        const query = `
            UPDATE reportes 
            SET estado = $1 
            WHERE id = $2
            RETURNING *; 
        `;
        
        // Asignar el valor adecuado para el estado
        const estado = decision === 'ACEPTADO' ? 'ACEPTADO' : 'RECHAZADO'; 
        const values = [estado, id];

        console.log("Consulta SQL:", query, "Valores:", values); // Log para depuración

        const result = await db.query(query, values);

        res.status(200).json(result.rows); 
    } catch (error) {
        console.error("Error al decidir sobre el reporte:", error);
        res.status(500).json({ error: "Error al decidir sobre el reporte" });
    }
};

module.exports = {crearReporte,
                  obtenerReportes,
                  borrarReporte,
                  estadoReporte
}