const { Router } = require('express');
const db = require('../db');
const config = require ('../config')

const router = Router();

const { 
    obtenerVoluntarios, 
    obtenerVoluntario,
    registroVoluntario,
    borrarVoluntario,
    actualizarVoluntario,
    loginVoluntario
} = require('../controllers/voluntarios.controller')

//Rutas de voluntarios
router.get('/voluntarios', obtenerVoluntarios);
router.get('/voluntarios/:id', obtenerVoluntario)
router.post('/voluntarios', registroVoluntario);
router.post('/voluntarios/login', loginVoluntario)
router.delete('/voluntarios/:id', borrarVoluntario);
router.put('/voluntarios/:id', actualizarVoluntario);

module.exports = router;