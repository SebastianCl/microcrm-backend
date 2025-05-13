const express = require('express');
const router = express.Router();
const { getClients, getClient, createClient, deleteClient } = require('../controllers/client.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken(['admin', 'empleado']), getClients);
router.get('/:id', authenticateToken(['admin', 'empleado']), getClient);
router.post('/', authenticateToken(['admin', 'empleado']), createClient);
router.delete('/:id', authenticateToken(['admin', 'empleado']), deleteClient);

module.exports = router;
