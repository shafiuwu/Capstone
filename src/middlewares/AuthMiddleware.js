const jwt = require('jsonwebtoken');
const config = require('../config');

const authVoluntarioMiddleware = (req, res, next) => {
    console.log('Middleware de autenticación ejecutándose...');
    const token = req.cookies.tokenAcceso; // Asegúrate de que el nombre de la cookie sea correcto
    const secretKey = config.secretTokenKey
    if (!token) {
        console.log('No se proporcionó un token.');
        return res.status(401).json({ message: 'No autenticado.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log('Token inválido:', err);
            return res.status(401).json({ message: 'Token inválido.' });
        }

        req.voluntario = {
            id: decoded.id,       
            rol_id: decoded.rol_id
        };
        console.log('ID del voluntario:', req.voluntarioId);
        next();
    });
};

const authOrganizacionMiddleware = (req, res, next) => {
    console.log('Middleware de autenticación ejecutándose...');
    const token = req.cookies.tokenAccesoEmpresa; 
    const secretKey = config.secretTokenKey

    if (!token) {
        console.log('No se proporcionó un token.');
        return res.status(401).json({ message: 'No autenticado.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log('Token inválido:', err);
            return res.status(401).json({ message: 'Token inválido.' });
        }

        console.log('Datos del token decodificado:', decoded);

        req.organizacion = {
            id: decoded.id,
            rol_id: decoded.rol_id,
            nombre: decoded.nombre  
        };

        console.log('ID de la organización:', req.organizacion.id);
        console.log('Nombre de la organización:', req.organizacion.nombre);

        next();
    });
};

const verificarAdmin = (req, res, next) => {
    if (req.voluntario && req.voluntario.rol_id === 2) {
        next();
    } else {
        return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
    }
};


module.exports = {  
    authVoluntarioMiddleware,
    authOrganizacionMiddleware,
    verificarAdmin
};
