const db = require('../db')

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
        descripcion,
        imagenes
    } = req.body;

    try {
        const datos = await db.query(
            "INSERT INTO actividades (nombre_actividad, organizacion_a_cargo, direccion, requisitos, fecha_inicio, fecha_fin, descripcion, imagenes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
            [
                nombre_actividad,
                organizacion_a_cargo,
                direccion,
                requisitos,
                fecha_inicio,
                fecha_fin,
                descripcion,
                imagenes
            ]
        );

        console.log(datos);
        res.status(201).send('Actividad creada correctamente');
    } catch (error) {
        console.log(error)
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

module.exports = {
    obtenerDatos,
    obtenerDato,
    crearActividad,
    borrarActividad,
    actualizarActividad,
}