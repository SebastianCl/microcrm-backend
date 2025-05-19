const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedido.controller');
// const authenticateToken = require('../middlewares/auth.middleware');

router.post('/', pedidoController.crearPedido);
router.get('/:id/detalle', pedidoController.obtenerDetallePedido);
router.patch('/:id/estado', pedidoController.actualizarEstadoPedido);

module.exports = router;