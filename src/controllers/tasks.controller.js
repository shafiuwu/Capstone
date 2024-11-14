const db = require('../db')
const { v4: uuidv4 } = require('uuid');
const { enviarCorreo } = require('../services/email.services');

const obtenerDatos =  async(req, res) => {
    try{
    todasActividades = await db.query('SELECT * FROM actividades;')
    res.json(todasActividades.rows)
    }catch(error){
        next(error)
    }
};

const datosRandom =  async(req, res) => {
    try{
    todasActividades = await db.query(`
    SELECT id, nombre_actividad, organizacion_a_cargo, 
    direccion, requisitos, 
    fecha_inicio, fecha_fin, 
    descripcion, imagenes, organizacion_id, 
    categoria, habilitar_diploma
	FROM public.actividades
	ORDER BY RANDOM()
	LIMIT 3;

        `)
    res.json(todasActividades.rows)
    }catch(error){
        next(error)
    }
};

const datosPorRecomendacion = async (req, res) => {
    try {
        const recomendacionUsuario = req.voluntario.tipo_voluntariado;
        const obtenerTarea = await db.query('SELECT * FROM actividades WHERE categoria = $1', [recomendacionUsuario]); 

        console.log(obtenerTarea);

        if (obtenerTarea.rows.length === 0) {
            return res.status(404).json({ 
                message: 'Información no encontrada'
            });
        }
        return res.json(obtenerTarea.rows); 
    } catch (error) {
        console.log(error)
    }
};

const actividadPorOrganizacion = async (req, res) => {
    try {
        const organizacionId = req.organizacion.id;
        const obtenerTarea = await db.query('SELECT * FROM actividades WHERE organizacion_id = $1', [organizacionId]); 

        console.log(obtenerTarea);

        if (obtenerTarea.rows.length === 0) {
            return res.status(404).json({ 
                message: 'Información no encontrada'
            });
        }
        return res.json(obtenerTarea.rows); 
    } catch (error) {
        console.log(error)
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
        direccion,
        requisitos,
        fecha_inicio,
        fecha_fin,
        descripcion,
        categoria
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
            "INSERT INTO actividades (id, nombre_actividad, organizacion_a_cargo, direccion, requisitos, fecha_inicio, fecha_fin, descripcion, imagenes, organizacion_id, categoria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
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
                organizacionId,
                categoria
                
            ]
        );

        console.log(datos.rows);
        res.status(201).send('Actividad creada correctamente');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al crear la actividad');
    }
};

const borrarActividad = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Eliminar inscripciones relacionadas con la actividad
      await db.query('DELETE FROM inscripciones WHERE actividad_id = $1', [id]);
  
      // Luego, eliminar la actividad
      const resultado = await db.query('DELETE FROM actividades WHERE id = $1', [id]);
  
      if (resultado.rowCount === 0) {
        return res.status(404).json({
          message: 'Actividad no encontrada'
        });
      }
  
      return res.status(200).json({
        message: 'Actividad eliminada correctamente',
        id: id
      });
    } catch (error) {
      next(error);
    }
  };
  
  const actualizarActividad = async (req, res, next) => {
    const { id } = req.params;
    const {
        nombre_actividad,
        organizacion_a_cargo,
        direccion,
        requisitos,
        fecha_inicio,
        fecha_fin,
        descripcion,
        categoria
    } = req.body;

    // Procesar las nuevas imágenes
    let nuevasImagenes = req.files ? req.files.map(file => file.filename) : [];

    try {
        // Actualizar la actividad con las nuevas imágenes
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
                imagenes = $8,
                categoria = $9
            WHERE id = $10`,
            [
                nombre_actividad,
                organizacion_a_cargo,
                direccion,
                requisitos,
                fecha_inicio,
                fecha_fin,
                descripcion,
                nuevasImagenes, // Almacenar solo las nuevas imágenes
                categoria,
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
        return next(error);
    }
};


const postularActividad = async (req, res, next) => {
    try {
        const { actividad_id } = req.body;
        const voluntario_id = req.voluntario.id;

        // Verificar si ya existe una inscripción para este voluntario en la actividad
        const inscripcionExistente = await db.query(
            'SELECT * FROM inscripciones WHERE actividad_id = $1 AND voluntario_id = $2',
            [actividad_id, voluntario_id]
        );

        if (inscripcionExistente.rows.length > 0) {
            return res.status(400).json({ message: 'Ya has postulado a esta actividad' });
        }

        // Obtener la organización de la actividad
        const organizacion = await db.query(
            'SELECT organizacion_id FROM actividades WHERE id = $1',
            [actividad_id]
        );

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
                   ins.voluntario_id,
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

const verPostulaciones = async (req, res, next) => {
    try {
        const voluntarioId = req.voluntario.id; 
        const todasPostulaciones = await db.query(`
            SELECT ins.id,
                   vol.nombre,
                   vol.apellido,
                   vol.correo,
                   vol.telefono,
                   ins.voluntario_id,
                   act.nombre_actividad,
                   org.nombre AS nombre_organizacion,
                   ins.estado
            FROM inscripciones ins
            JOIN voluntarios vol ON ins.voluntario_id = vol.id
            JOIN actividades act ON ins.actividad_id = act.id
            JOIN empresa org ON act.organizacion_id = org.id
            WHERE ins.voluntario_id = $1
        `, [voluntarioId]); 

        res.json(todasPostulaciones.rows);
    } catch (error) {
        next(error); 
    }
};

const decidirPostulante = async (req, res) => {
    const { id, decision, emailVoluntario, actividadNombre } = req.body;

    try {
        // Actualizar estado en la base de datos
        const query = `
            UPDATE inscripciones 
            SET estado = $1 
            WHERE id = $2
            RETURNING *;
        `;

        const estado = decision === 'ACEPTADO' ? 'ACEPTADO' : 'RECHAZADO';
        const values = [estado, id];
        const result = await db.query(query, values);

        // Preparar asunto y contenido HTML del correo según la decisión
        const subject = decision === 'ACEPTADO' ? 'Felicidades, has sido aceptado' : 'Lo sentimos, tu postulación fue rechazada';
        const htmlContent = decision === 'ACEPTADO'
            ? `<h1 style="color: #4CAF50;">¡Felicidades!</h1>
               <p>Nos complace informarte que has sido <strong>aceptado</strong> para la actividad <em>${actividadNombre}</em>.</p>
               <p>Estamos emocionados de darte la bienvenida y esperamos que esta experiencia sea enriquecedora para ti.</p>
               <p>¡Nos vemos pronto!</p>`
            : `<h1 style="color: #FF5733;">Lo sentimos</h1>
               <p>Tu postulación para la actividad <em>${actividadNombre}</em> no fue <strong>aceptada</strong> en esta ocasión.</p>
               <p>Apreciamos tu interés y te animamos a que te postules en futuras actividades.</p>
               <p>Gracias por tu comprensión.</p>`;

        // Enviar correo al voluntario con contenido HTML
        await enviarCorreo(emailVoluntario, subject, htmlContent);

        // Enviar respuesta de éxito al cliente
        res.status(200).json({ message: 'Decisión enviada con éxito', data: result.rows });

    } catch (error) {
        console.error('Error al decidir sobre el postulante o al enviar el correo:', error);
        res.status(500).send('Error al decidir sobre el postulante');
    }
};



  

module.exports = {
    obtenerDatos,
    obtenerDato,
    datosRandom,
    crearActividad,
    borrarActividad,
    actualizarActividad,
    postularActividad,
    obtenerPostulaciones,
    decidirPostulante,
    datosPorRecomendacion,
    verPostulaciones,
    actividadPorOrganizacion
}