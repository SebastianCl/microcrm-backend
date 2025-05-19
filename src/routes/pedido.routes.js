const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedido.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.post('/', authenticateToken(['admin', 'empleado']), pedidoController.crearPedido);
router.get('/:id/detalle', authenticateToken(['admin', 'empleado']), pedidoController.obtenerDetallePedido);
router.patch('/:id/estado', authenticateToken(['admin', 'empleado']), pedidoController.actualizarEstadoPedido);

module.exports = router;