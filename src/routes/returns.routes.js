const express = require('express');
const router = express.Router();
const { getAllReturns, getReturnById, createReturn } = require('../controllers/returns.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken(['admin', 'empleado']), getAllReturns);
router.get('/:id', authenticateToken(['admin', 'empleado']), getReturnById);
router.post('/', authenticateToken(['admin', 'empleado']), createReturn);

module.exports = router; 