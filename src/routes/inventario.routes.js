const express = require('express');
const router = express.Router();
const {
    getInventoryRecords,
    getInventoryByProductId,
    createInventoryMovement
} = require('../controllers/inventario.controller'); 
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken(['admin', 'empleado']), getInventoryRecords);
router.get('/:id', authenticateToken(['admin', 'empleado']), getInventoryByProductId);
router.post('/', authenticateToken(['admin', 'empleado']), createInventoryMovement);

module.exports = router;

