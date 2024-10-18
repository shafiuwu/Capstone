const { Router } = require('express');
const db = require('../db');
const {
    authVoluntarioMiddleware,
    verificarAdmin
} = require('../middlewares/authMiddleware');
const router = Router();
const multer = require('multer');
const path = require('path'); 


const { 
    obtenerVoluntarios, 
    obtenerVoluntario,
    registroVoluntario,
    borrarVoluntario,
    actualizarVoluntario,
    loginVoluntario,
    perfilVoluntario,
    obtenerRecomendacionVoluntario,
    IngresarTipoVoluntario
} = require('../controllers/voluntarios.controller')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Asegúrate de que la ruta es correcta
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Guarda el archivo con un nombre único
    }
});

const upload = multer({ storage: storage });

//Rutas de voluntarios
router.get('/voluntarios/perfil', authVoluntarioMiddleware, perfilVoluntario);
router.get('/voluntarios', obtenerVoluntarios);
router.get('/voluntario', authVoluntarioMiddleware, obtenerVoluntario)
router.post('/voluntarios', upload.single('foto_perfil'), registroVoluntario);
router.post('/voluntarios/login', loginVoluntario)
router.delete('/voluntario', authVoluntarioMiddleware, borrarVoluntario);
router.post('/voluntarios/ingresarTipo',authVoluntarioMiddleware, IngresarTipoVoluntario);
router.put('/voluntarios/actualizar', upload.single('foto_perfil'), authVoluntarioMiddleware, actualizarVoluntario);
router.post('/voluntario/recomendacion', obtenerRecomendacionVoluntario)




module.exports = router;