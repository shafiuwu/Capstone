const express = require('express');
const { generarDiplomaHandler,
        estadoDiploma
 } = require('../controllers/diploma.controller');
const router = express.Router();

router.get('/diploma/:voluntarioId/:actividadId', generarDiplomaHandler);
router.post('/diploma/habilitar', estadoDiploma);


module.exports = router;


