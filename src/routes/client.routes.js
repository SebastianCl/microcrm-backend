const express = require('express');
const router = express.Router();
const { getClients, getClient, createClient, updateStatus, updateCliente } = require('../controllers/client.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken(['admin', 'empleado']), getClients);
router.get('/:id', authenticateToken(['admin', 'empleado']), getClient);
router.post('/', authenticateToken(['admin', 'empleado']), createClient);
router.patch('/:id', authenticateToken(['admin']), updateStatus);
router.put('/:id', authenticateToken(['admin', 'empleado']), updateCliente);

module.exports = router;
