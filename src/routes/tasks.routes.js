const { Router } = require('express');
const db = require('../db');
const { 
    obtenerDatos, 
    obtenerDato,
    crearActividad,
    borrarActividad, 
    actualizarActividad,
    postularActividad,
    obtenerPostulaciones,
    decidirPostulante
} = require('../controllers/tasks.controller')
const router = Router();
const multer = require('multer');
const path = require('path');
const {
    authOrganizacionMiddleware,
    authVoluntarioMiddleware
} = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


//Rutas de actividades
router.get('/actividades', obtenerDatos);
router.get('/actividades/:id', obtenerDato);
router.post('/actividades', upload.array('imagenes', 10), authOrganizacionMiddleware, crearActividad);
router.delete('/actividades/:id', borrarActividad);
router.put('/actividades/:id', upload.array('imagenes', 10), actualizarActividad);
router.post('/postular', authVoluntarioMiddleware, postularActividad);
router.get('/obtenerPostulaciones', authOrganizacionMiddleware, obtenerPostulaciones);
router.post('/postulantes/decidir', decidirPostulante);


module.exports = router;
