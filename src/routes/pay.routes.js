const express = require ('express');
const { createOrder,
        handlePayment,
        receiveWebhook
 } = require ('../controllers/pay.controller'); // Asegúrate de tener la ruta correcta al controlador

const router = express.Router();

// Ruta para crear una orden
router.post('/createOrder', createOrder);
router.post('/success', (req, res) => res.send ("Success"));
router.post('/failure', (req, res) => res.send ("Failure"));
router.post('/pending', (req, res) => res.send ("Pending"));

router.post('/webhook', receiveWebhook);

module.exports = router;
