const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/factura.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.post('/:id/generar', authenticateToken(['admin', 'empleado']), facturaController.generarFacturaBase64);

module.exports = router;