const express = require('express');
const router = express.Router();
const { getAllMesas, getMesaById, getMesaByClientId,  createMesa, toggleMesaStatus, updateMesa } = require('../controllers/mesas.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken(['admin', 'empleado']), getAllMesas);
router.get('/:id',  authenticateToken(['admin', 'empleado']), getMesaById);
router.get('/client/:id', getMesaByClientId);
router.post('/', authenticateToken(['admin', 'empleado']), createMesa);
router.patch('/:id', authenticateToken(['admin']), toggleMesaStatus);
router.put('/:id', updateMesa);

module.exports = router;