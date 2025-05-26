const express = require('express');
const router = express.Router();
const { getConfigurations, getByClientId, updateModuleStatus } = require('../controllers/configuration.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken(['admin', 'empleado']),getConfigurations);
router.get('/:id', authenticateToken(['admin','empleado']),getByClientId);
router.put('/', authenticateToken(['admin', 'empleado']),updateModuleStatus);

module.exports = router;