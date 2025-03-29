const { Router } = require('express');
const db = require('../db');
const {crearReporte,
       obtenerReportes,
       borrarReporte,
       estadoReporte
} = require('../controllers/reportes.controllers')
const router = Router();

router.get('/verReportes', obtenerReportes);
router.post('/crearReporte/:actividadId', crearReporte);
router.delete('/borrarReporte/:id', borrarReporte);
router.post('/reporte/decidir', estadoReporte);



module.exports = router;
