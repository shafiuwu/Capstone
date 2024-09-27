const { Router } = require('express');
const db = require('../db');

const { 
    obtenerDatos, 
    obtenerDato,
    crearActividad,
    borrarActividad, 
    actualizarActividad,
} = require('../controllers/tasks.controller')


const router = Router();

//Rutas de actividades
router.get('/actividades', obtenerDatos);
router.get('/actividades/:id', obtenerDato);
router.post('/actividades', crearActividad)
router.delete('/actividades/:id', borrarActividad);
router.put('/actividades/:id', actualizarActividad);

module.exports = router;
