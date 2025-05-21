const express = require('express');
const router = express.Router();
const { getAllVentas, getVentaById, createVenta } = require('../controllers/ventas.controller');
const authenticateToken = require('../middlewares/auth.middleware');


router.get('/', authenticateToken(['admin', 'empleado']), getAllVentas);
router.get('/:id', authenticateToken(['admin', 'empleado']), getVentaById);
router.post('/',  authenticateToken(['admin', 'empleado']), createVenta);

module.exports = router;
