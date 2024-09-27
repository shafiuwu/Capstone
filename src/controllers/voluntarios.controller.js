const db = require('../db')
const config = require ('../config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const obtenerVoluntarios = async (req, res) => {
    try {
        const todosVoluntarios = await db.query('SELECT * FROM voluntarios;');
        res.json(todosVoluntarios.rows);
    } catch (error) {
        next(error);
    }
};

const obtenerVoluntario = async (req, res) => {
    try {
        const { id } = req.params;
        const obtenerVoluntario = await db.query('SELECT * FROM voluntarios WHERE id = $1', [id]);

        if (obtenerVoluntario.rows.length === 0) {
            return res.status(404).json({
                message: 'Voluntario no encontrado'
            });
        }
        return res.json(obtenerVoluntario.rows[0]);
    } catch (error) {
        next(error);
    }
};

const registroVoluntario = async (req, res) => {
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
        const salt = await bcrypt.genSalt(10);
        const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);

        const datos = await db.query(
            "INSERT INTO voluntarios (nombre, apellido, correo, contraseña, telefono, fecha_nacimiento, direccion, habilidades, foto_perfil, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
            [
                nombre,
                apellido,
                correo,
                contraseñaEncriptada,
                telefono,
                fecha_nacimiento,
                direccion,
                habilidades,
                foto_perfil,
                estado
            ]
        );

        res.status(201).send('Voluntario creado correctamente');
    } catch (error) {
        console.log(error)
    }
};

const borrarVoluntario = async (req, res) => {
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

const actualizarVoluntario = async (req, res) => {
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
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: voluntario.id }, config.secretTokenKey, { expiresIn: '1h' });

        res.status(200).json({ 
            message: 'Inicio de sesión exitoso', 
            token 
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    obtenerVoluntarios,
    obtenerVoluntario,
    registroVoluntario,
    borrarVoluntario,
    actualizarVoluntario,
    loginVoluntario
}