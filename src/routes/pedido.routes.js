const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedido.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.post('/', authenticateToken(['admin', 'empleado']), pedidoController.crearPedido);
router.get('/dia', authenticateToken(['admin', 'empleado']), pedidoController.getPedidosDelDia);
router.get('/:id/detalle', authenticateToken(['admin', 'empleado']), pedidoController.obtenerDetallePedido);
router.patch('/:id/estado',  authenticateToken(['admin','empleado']), pedidoController.actualizarEstadoPedido);
router.post('/:id/agregar', authenticateToken(['admin', 'empleado']), pedidoController.AddproductoPedido);
router.put('/:id/ajustar', authenticateToken(['admin', 'empleado']), pedidoController.ajustarPedido);

module.exports = router;