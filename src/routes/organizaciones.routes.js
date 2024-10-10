const { Router } = require('express');
const db = require('../db');

const { authOrganizacionMiddleware } = require('../middlewares/AuthMiddleware')
const { 
    obtenerOrganizaciones, 
    obtenerOrganizacion,
    crearOrganizacion,
    borrarOrganizacion, 
    actualizarOrganizacion,
    loginOrganizacion,
    perfilOrganizacion
} = require('../controllers/organizaciones.controller');

const router = Router();
const multer = require('multer');
const path = require('path'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Asegúrate de que la ruta es correcta
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Guarda el archivo con un nombre único
    }
});

const upload = multer({ storage: storage });

router.get('/organizaciones/perfil', authOrganizacionMiddleware, perfilOrganizacion);
router.get('/organizaciones', obtenerOrganizaciones);
router.get('/organizaciones/:id', obtenerOrganizacion);
router.post('/organizaciones', upload.single('foto_empresa'), crearOrganizacion);
router.post('/organizaciones/login', loginOrganizacion);
router.delete('/organizacion', authOrganizacionMiddleware, borrarOrganizacion);
router.put('/organizaciones/:id', authOrganizacionMiddleware, actualizarOrganizacion);

module.exports = router;
