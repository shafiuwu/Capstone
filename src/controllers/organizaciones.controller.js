const db = require('../db');
const config = require ('../config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const obtenerOrganizaciones = async (req, res, next) => {
    try {
        const todasOrganizaciones = await db.query('SELECT * FROM empresa;');
        res.json(todasOrganizaciones.rows);
    } catch (error) {
        next(error);
    }
};

const obtenerOrganizacion = async (req, res, next) => {
    try {
        const { id } = req.params; 
        const obtenerOrganizacion = await db.query('SELECT * FROM empresa WHERE id = $1', [id]); 

        console.log(obtenerOrganizacion);

        if (obtenerOrganizacion.rows.length === 0) {
            return res.status(404).json({ 
                message: 'Información no encontrada'
            });
        }
        return res.json(obtenerOrganizacion.rows[0]); 
    } catch (error) {
        next(error);
    }
};

const crearOrganizacion = async (req, res, next) => {
    const {
        nombre,
        tipo_organizacion,
        contacto_email,
        contraseña,
        contacto_telefono,
        descripcion
    } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);
        const datos = await db.query(
            "INSERT INTO empresa (nombre, tipo_organizacion, contacto_email, \"contraseña\", contacto_telefono, descripcion) VALUES ($1, $2, $3, $4, $5, $6)",
            [
                nombre,
                tipo_organizacion,
                contacto_email,
                contraseñaEncriptada,
                contacto_telefono,
                descripcion,
            ]
        );

        console.log(datos);
        res.status(201).send('Organización creada correctamente');
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const borrarOrganizacion = async (req, res, next) => {
    try {
        const { id } = req.params; 
        const resultado = await db.query('DELETE FROM empresa WHERE id = $1', [id]); 

        if (resultado.rowCount === 0) {
            return res.status(404).json({ 
                message: 'Información no encontrada'
            });
        }
        return res.status(200).json({
            message: 'Organización eliminada correctamente',
            id: id
        });
        console.log(resultado);
    } catch (error) {
        next(error);
    }
};

const actualizarOrganizacion = async (req, res, next) => {
    const { id } = req.params;
    const {
        nombre,
        tipo_organizacion,
        contacto_email,
        contacto_telefono,
        descripcion
    } = req.body;

    try {
        const resultado = await db.query(
            `UPDATE empresa
            SET 
                nombre = $1,
                tipo_organizacion = $2,
                contacto_email = $3,
                contacto_telefono = $4,
                descripcion = $5
            WHERE id = $6`,
            [
                nombre,
                tipo_organizacion,
                contacto_email,
                contacto_telefono,
                descripcion,
                id
            ]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                message: 'Organización no encontrada'
            });
        }

        console.log(`Organización actualizada ID: ${id}`);
        return res.status(200).json({
            message: 'Organización actualizada correctamente'
        });
    } catch (error) {
        next(error);
    }
};

const loginOrganizacion = async (req, res, next) => {
    const { correo, contraseña } = req.body;

    try {
        // Consulta para obtener la empresa por correo
        const resultado = await db.query('SELECT * FROM empresa WHERE contacto_email = $1', [correo]);

        // Verifica si la empresa fue encontrada
        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }

        const empresa = resultado.rows[0];

        // Verifica la contraseña ingresada
        const esContraseñaValida = await bcrypt.compare(contraseña, empresa.contraseña);

        if (!esContraseñaValida) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Genera un token JWT
        const token = jwt.sign({ id: empresa.id }, config.secretTokenKey, { expiresIn: '1h' });

        // Responde con el mensaje y el token
        res.status(200).json({ 
            message: 'Inicio de sesión exitoso', 
            token 
        });
    } catch (error) {
        console.log(error);
        next(error); // Pasa el error al manejador de errores
    }
};

module.exports = {
    obtenerOrganizaciones,
    obtenerOrganizacion,
    crearOrganizacion,
    borrarOrganizacion,
    actualizarOrganizacion,
    loginOrganizacion
};
