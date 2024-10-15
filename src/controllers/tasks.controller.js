const db = require('../db')
const { v4: uuidv4 } = require('uuid');

const obtenerDatos =  async(req, res) => {
    try{
    todasActividades = await db.query('SELECT * FROM actividades;')
    res.json(todasActividades.rows)
    }catch(error){
        next(error)
    }
};

const obtenerDato = async (req, res) => {
    try {
        const { id } = req.params; 
        const obtenerTarea = await db.query('SELECT * FROM actividades WHERE id = $1', [id]); 

        console.log(obtenerTarea);

        if (obtenerTarea.rows.length === 0) {
            return res.status(404).json({ 
                message: 'Información no encontrada'
            });
        }
        return res.json(obtenerTarea.rows[0]); 
    } catch (error) {
        next(error)
    }
};

const crearActividad = async (req, res) => {
    const {
        nombre_actividad,
        organizacion_a_cargo,
        direccion,
        requisitos,
        fecha_inicio,
        fecha_fin,
        descripcion
    } = req.body;

    const organizacionId = req.organizacion.id;
    const nombreOrganizacion = req.organizacion.nombre

    const id = uuidv4();
    let imagenes = [];

    if (req.files) {
        imagenes = req.files.map(file => file.filename); // Obtener los nombres de los archivos
    }

    try {
        const datos = await db.query(
            "INSERT INTO actividades (id, nombre_actividad, organizacion_a_cargo, direccion, requisitos, fecha_inicio, fecha_fin, descripcion, imagenes, organizacion_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
            [
                id,
                nombre_actividad,
                nombreOrganizacion,
                direccion,
                requisitos,
                fecha_inicio,
                fecha_fin,
                descripcion,
                imagenes,
                organizacionId
            ]
        );

        console.log(datos.rows);
        res.status(201).send('Actividad creada correctamente');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al crear la actividad');
    }
};





const borrarActividad = async (req, res) => {
    try{
    const { id } = req.params; 
    const resultado = await db.query('DELETE FROM actividades WHERE id = $1', [id]); 

    if (resultado.rowCount === 0) {
        return res.status(404).json({ 
            message: 'Información no encontrada'
        });
    }
    return res.status(200).json({
        message: 'Actividad eliminada correctamente',
        id: id
    });
    console.log(resultado)
    }catch(error){
        next(error)
    }

    
};


const actualizarActividad = async (req, res) => {
    const { id } = req.params;
    const {
        nombre_actividad,
        organizacion_a_cargo,
        direccion,
        requisitos,
        fecha_inicio,
        fecha_fin,
        descripcion,
        imagenes
    } = req.body;

    try {
        const resultado = await db.query(
            `UPDATE actividades
            SET 
                nombre_actividad = $1,
                organizacion_a_cargo = $2,
                direccion = $3,
                requisitos = $4,
                fecha_inicio = $5,
                fecha_fin = $6,
                descripcion = $7,
                imagenes = $8
            WHERE id = $9`,
            [
                nombre_actividad,
                organizacion_a_cargo,
                direccion,
                requisitos,
                fecha_inicio,
                fecha_fin,
                descripcion,
                imagenes,
                id
            ]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                message: 'Actividad no encontrada'
            });
        }

        console.log(`Actividad actualizada ID: ${id}`);
        return res.status(200).json({
            message: 'Actividad actualizada correctamente'
        });
    } catch (error) {
        next(error)
    }
};

const postularActividad = async (req, res, next) => {
    try {
        const { actividad_id } = req.body;
        const voluntario_id = req.voluntario.id;
        const organizacion = await db.query('SELECT organizacion_id FROM actividades WHERE id = $1', [actividad_id]);

        if (organizacion.rows.length === 0) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }

        const organizacion_id = organizacion.rows[0].organizacion_id;

        // Insertar en la tabla de inscripciones
        await db.query(
            'INSERT INTO inscripciones (actividad_id, voluntario_id, organizacion_id) VALUES ($1, $2, $3)',
            [actividad_id, voluntario_id, organizacion_id]
        );

        return res.status(200).json({ message: 'Postulación exitosa' });
    } catch (error) {
        next(error);
    }
};

const obtenerPostulaciones = async (req, res, next) => {
    try {
        const organizacionId = req.organizacion.id; 
        const todasPostulaciones = await db.query(`
            SELECT ins.id,
                   vol.nombre,
                   vol.apellido,
                   vol.correo,
                   vol.telefono,
                   act.nombre_actividad,
                   org.nombre AS nombre_organizacion,
                   ins.estado
            FROM inscripciones ins
            JOIN voluntarios vol ON ins.voluntario_id = vol.id
            JOIN actividades act ON ins.actividad_id = act.id
            JOIN empresa org ON act.organizacion_id = org.id
            WHERE act.organizacion_id = $1
        `, [organizacionId]); // Aquí aseguramos que la consulta esté correctamente formateada.

        res.json(todasPostulaciones.rows);
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
};

const decidirPostulante = async (req, res) => {
    const { id, decision } = req.body;

    try {
        const query = `
            UPDATE inscripciones 
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
        console.error("Error al decidir sobre el postulante:", error);
        res.status(500).json({ error: "Error al decidir sobre el postulante" });
    }
};


  

module.exports = {
    obtenerDatos,
    obtenerDato,
    crearActividad,
    borrarActividad,
    actualizarActividad,
    postularActividad,
    obtenerPostulaciones,
    decidirPostulante
}