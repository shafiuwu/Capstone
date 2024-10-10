const db = require('../db');
const config = require ('../config')
const index = require('../index')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


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
        contrasena,
        contacto_telefono,
        descripcion
    } = req.body;

    const foto_empresa = req.file ? req.file.filename : null; 


    try {
        if (!contrasena) {
            return res.status(400).json({ error: 'La contraseña es obligatoria.' });
        }
        
        const id = uuidv4();
        const salt = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

        const datos = await db.query(
            "INSERT INTO empresa (id, nombre, tipo_organizacion, contacto_email, contrasena, contacto_telefono, descripcion, foto_empresa) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
            [
                id,
                nombre,
                tipo_organizacion,
                contacto_email,
                contrasenaEncriptada,
                contacto_telefono,
                descripcion,
                foto_empresa

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
        const organizacionId = req.organizacion.id;
        const resultado = await db.query('DELETE FROM empresa WHERE id = $1', [organizacionId]); 

        if (resultado.rowCount === 0) {
            return res.status(404).json({ 
                message: 'Información no encontrada'
            });
        }
        return res.status(200).json({
            message: 'Organización eliminada correctamente',
            id: organizacionId
        });
    } catch (error) {
        next(error);
    }
};

const actualizarOrganizacion = async (req, res, next) => {
    const organizacionId = req.organizacion.id;
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
                organizacionId
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
    const { correo, contrasena } = req.body;

    try {
        const resultado = await db.query('SELECT * FROM empresa WHERE contacto_email = $1', [correo]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }

        const empresa = resultado.rows[0];

        const esContraseñaValida = await bcrypt.compare(contrasena, empresa.contrasena);

        if (!esContraseñaValida) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: empresa.id, rol_id: empresa.rol_id }, config.secretTokenKey, { expiresIn: '1h' });
        
        res.cookie('tokenAccesoEmpresa', token, {
            maxAge: 3600000
        }).send(token);

    } catch (error) {
        console.log(error);
        next(error);
    }
};

const perfilOrganizacion = async (req, res, next) => {
    const organizacionId = req.organizacion.id;
    console.log('ID del organizacion para la consulta:', organizacionId);

    try {
        const resultado = await db.query(
            'SELECT * FROM empresa WHERE id = $1',
            [organizacionId]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: 'Organizacion no encontrada.' });
        }

        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ message: 'Error en la consulta a la base de datos.' });
    }
};




module.exports = {
    obtenerOrganizaciones,
    obtenerOrganizacion,
    crearOrganizacion,
    borrarOrganizacion,
    actualizarOrganizacion,
    loginOrganizacion,
    perfilOrganizacion
};
