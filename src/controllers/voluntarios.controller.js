const db = require('../db');
const config = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

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
        const { id } = req.params;
        const resultado = await db.query('SELECT * FROM voluntarios WHERE id = $1', [id]);

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
        const { id } = req.params;
        const resultado = await db.query('DELETE FROM voluntarios WHERE id = $1', [id]);

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                message: 'Voluntario no encontrado'
            });
        }

        return res.status(200).json({
            message: 'Voluntario eliminado correctamente',
            id: id
        });
    } catch (error) {
        next(error);
    }
};

const actualizarVoluntario = async (req, res, next) => {
    const { id } = req.params;
    const {
        nombre,
        apellido,
        correo,
        contraseña,
        telefono,
        fecha_nacimiento,
        direccion,
        habilidades,
        foto_perfil,
        estado
    } = req.body;

    try {
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
                contraseña,
                telefono,
                fecha_nacimiento,
                direccion,
                habilidades,
                foto_perfil,
                estado,
                id 
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


module.exports = {
    obtenerVoluntarios,
    obtenerVoluntario,
    registroVoluntario,
    borrarVoluntario,
    actualizarVoluntario,
    loginVoluntario,
    perfilVoluntario,
};
