const express = require('express');
const router = express.Router();
const { getAllVentas, getVentaById, createVenta } = require('../controllers/ventas.controller');

router.get('/', getAllVentas);
router.get('/:id', getVentaById);
router.post('/', createVenta);

module.exports = router;
