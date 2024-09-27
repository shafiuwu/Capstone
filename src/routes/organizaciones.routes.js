const { Router } = require('express');
const db = require('../db');

const { 
    obtenerOrganizaciones, 
    obtenerOrganizacion,
    crearOrganizacion,
    borrarOrganizacion, 
    actualizarOrganizacion,
    loginOrganizacion,
} = require('../controllers/organizaciones.controller');

const router = Router();

// Rutas de organizaciones
router.get('/organizaciones', obtenerOrganizaciones);
router.get('/organizaciones/:id', obtenerOrganizacion);
router.post('/organizaciones', crearOrganizacion);
router.post('/organizaciones/login', loginOrganizacion);
router.delete('/organizaciones/:id', borrarOrganizacion);
router.put('/organizaciones/:id', actualizarOrganizacion);

module.exports = router;
