const express = require('express');
const router = express.Router();
const { getCombos, getComboById, createCombo, updateCombo, updateStatus, } = require('../controllers/combos.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken(['admin', 'empleado']), getCombos);
router.get('/:id', authenticateToken(['admin', 'empleado']), getComboById);
router.post('/', authenticateToken(['admin', 'empleado']), createCombo);
router.patch('/:id', authenticateToken(['admin','empleado']), updateStatus);
router.put('/:id', authenticateToken(['admin', 'empleado']), updateCombo);

module.exports = router;

