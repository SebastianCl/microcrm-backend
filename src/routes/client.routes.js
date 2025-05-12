const express = require('express');
const router = express.Router();
const { getClients, getClient, createClient } = require('../controllers/client.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, getClients);
router.get('/:id', authenticateToken, getClient);
router.post('/', authenticateToken, createClient);

module.exports = router;
