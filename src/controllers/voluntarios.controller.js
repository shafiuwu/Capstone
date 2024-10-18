const db = require('../db');
const config = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const axios = require('axios');

const obtenerVoluntarios = async (req, res, next) => {
    try {
        const todosVoluntarios = await db.query('SELECT * FROM voluntarios;');
        res.json(todosVoluntarios.rows);
    } catch (error) {
        next(error);
    }
};

const obtenerVoluntario = async (req, res, next) => {
    try {
        const usuarioId = req.voluntario.id;
        const resultado = await db.query('SELECT * FROM voluntarios WHERE id = $1', [usuarioId]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                message: 'Voluntario no encontrado'
            });
        }
        return res.json(resultado.rows[0]);
    } catch (error) {
        console.error(error.message);
        next(error);
    }
};

const registroVoluntario = async (req, res, next) => {
    const {
        nombre,
        apellido,
        correo,
        contrasena,
        telefono,
        fecha_nacimiento,
        direccion,
        habilidades,
    } = req.body;

    const foto_perfil = req.file ? req.file.filename : null; 

    try {
        if (!contrasena) {
            return res.status(400).json({ error: 'La contraseña es obligatoria.' });
        }

        const id = uuidv4();
        const salt = await bcrypt.genSalt(10);
        const contraseñaEncriptada = await bcrypt.hash(contrasena, salt);

        await db.query(
            "INSERT INTO voluntarios (id, nombre, apellido, correo, contraseña, telefono, fecha_nacimiento, direccion, habilidades, foto_perfil) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
            [
                id,
                nombre,
                apellido,
                correo,
                contraseñaEncriptada,
                telefono,
                fecha_nacimiento,
                direccion,
                habilidades,
                foto_perfil,
            ]
        );

        res.status(201).send('Voluntario creado correctamente');
    } catch (error) {
        console.error('Error en el registro del voluntario:', error);
        next(error);
    }
};


const borrarVoluntario = async (req, res, next) => {
    try {
        const usuarioId = req.voluntario.id;
        const resultado = await db.query('DELETE FROM voluntarios WHERE id = $1', [usuarioId]);

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                message: 'Voluntario no encontrado'
            });
        }

        return res.status(200).json({
            message: 'Voluntario eliminado correctamente',
            id: usuarioId
        });
    } catch (error) {
        next(error);
    }
};

const actualizarVoluntario = async (req, res, next) => {
    const usuarioId = req.voluntario.id;

    const {
        nombre,
        apellido,
        correo,
        telefono,
        fecha_nacimiento,
        direccion,
        habilidades,
        estado,
        foto_perfil
    } = req.body;

    const nuevaFoto = req.file ? req.file.filename : foto_perfil;

    try {
        // Primero, obtenemos la contraseña actual de la base de datos
        const { rows } = await db.query(`SELECT contraseña FROM voluntarios WHERE id = $1`, [usuarioId]);
        const contraseñaActual = rows[0].contraseña;

        let contraseñaEncriptada = contraseñaActual; // Mantener la contraseña actual por defecto

        // Si se ha enviado una nueva contraseña, encriptarla
        if (req.body.contraseña) {
            const salt = await bcrypt.genSalt(10); // Número de rondas de salt
            contraseñaEncriptada = await bcrypt.hash(req.body.contraseña, salt);
        }

        // Actualizar los datos del voluntario, incluyendo la contraseña encriptada si fue cambiada
        const resultado = await db.query(
            `UPDATE voluntarios
            SET 
                nombre = $1,
                apellido = $2,
                correo = $3,
                contraseña = $4,  
                telefono = $5,
                fecha_nacimiento = $6,
                direccion = $7,
                habilidades = $8,
                foto_perfil = $9,
                estado = $10
            WHERE id = $11`,
            [
                nombre,
                apellido,
                correo,
                contraseñaEncriptada, // Contraseña actual o la nueva encriptada
                telefono,
                fecha_nacimiento,
                direccion,
                habilidades,
                nuevaFoto,
                estado,
                usuarioId
            ]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                message: 'Voluntario no encontrado'
            });
        }

        return res.status(200).json({
            message: 'Voluntario actualizado correctamente'
        });
    } catch (error) {
        next(error);
    }
};



const loginVoluntario = async (req, res, next) => {
    const { correo, contraseña } = req.body;

    try {
        const resultado = await db.query('SELECT * FROM voluntarios WHERE correo = $1', [correo]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: 'Voluntario no encontrado' });
        }

        const voluntario = resultado.rows[0];

        const esContraseñaValida = await bcrypt.compare(contraseña, voluntario.contraseña);

        if (!esContraseñaValida) {
            return res.status(401).json({ message: 'Contraseña u usuario incorrectos' });
        }

        const token = jwt.sign({ id: voluntario.id, rol_id: voluntario.rol_id }, config.secretTokenKey, { expiresIn: '1h' });

        res.cookie('tokenAcceso', token, {
            maxAge: 3600000
        }).send(token);

    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

const perfilVoluntario = async (req, res, next) => {
    const voluntarioId = req.voluntario.id;
    console.log('ID del voluntario para la consulta:', voluntarioId);

    try {
        const resultado = await db.query(
            'SELECT * FROM voluntarios WHERE id = $1',
            [voluntarioId]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: 'Voluntario no encontrado.' });
        }

        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ message: 'Error en la consulta a la base de datos.' });
    }
};

const obtenerRecomendacionVoluntario = async (req, res) => {
    const { responses } = req.body;

    const promptTipo = `
    Estas son las respuestas de un test de personalidad para un voluntario:
    ${responses.join(', ')}

    Según las respuestas, elige la categoría en la que mejor encaja esta persona (escoge solo una):
    Educación y Capacitación
    Salud y Bienestar
    Medioambiente y Sostenibilidad
    Desarrollo Comunitario
    Apoyo Social
    Protección Animal
    Cultura y Arte
    Tecnología y Comunicación
    Derechos Humanos y Justicia
    Deporte y Recreación
    Ayuda en Desastres y Emergencias
    `;

    const promptDescripcion = `
    Estas son las respuestas de un test de personalidad para un voluntario:
    ${responses.join(', ')}

    Según esto, proporciona una descripción de la persona pero no te limites
    a los que dicen textualmente las opciones se mas creativo y empieza siempre por El voluntario.
    `;

    try {
        
        const responseTipo = await config.client.chat.completions.create({
            model: 'gpt-4', 
            messages: [{ role: 'user', content: promptTipo }],
            max_tokens: 50, 
        });

        const tipo = responseTipo.choices[0].message.content.trim();

        const responseDescripcion = await config.client.chat.completions.create({
            model: 'gpt-4', 
            messages: [{ role: 'user', content: promptDescripcion }],
            max_tokens: 200, 
        });

        const descripcion = responseDescripcion.choices[0].message.content.trim();

        const result = {
            tipo: tipo,
            descripcion: descripcion
        };
        res.json(result);
    } catch (error) {
        console.error('Error al conectar con la API de OpenAI:', error.message);
        res.status(500).json({ error: 'Error al procesar la solicitud', details: error.message });
    }
};

const IngresarTipoVoluntario = async (req, res) => {
    const usuarioId = req.voluntario.id;
    const { tipo } = req.body; // Nuevo valor para 'tipo'
  
    if (!usuarioId || !tipo) {
      return res.status(400).json({ error: "ID y tipo son requeridos" });
    }
  
    try {
      // Actualizar solo el campo 'tipo' para el voluntario con el ID dado
      const query = `
        UPDATE public.voluntarios 
        SET tipo = $1 
        WHERE id = $2
        RETURNING id, nombre, apellido, correo, "contraseña", telefono, fecha_nacimiento, direccion, habilidades, foto_perfil, estado, rol_id, tipo;
      `;
      const values = [tipo, usuarioId];
  
      const result = await db.query(query, values);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Voluntario no encontrado" });
      }
  
      res.status(200).json(result.rows[0]); // Retorna el voluntario actualizado
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar el voluntario" });
    }
  };
  

module.exports = {
    obtenerVoluntarios,
    obtenerVoluntario,
    registroVoluntario,
    borrarVoluntario,
    actualizarVoluntario,
    loginVoluntario,
    perfilVoluntario,
    obtenerRecomendacionVoluntario,
    IngresarTipoVoluntario
};
