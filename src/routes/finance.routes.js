const express = require('express');
const router = express.Router();
const financeController = require('../controllers/finance.controller');
const authenticateToken = require('../middlewares/auth.middleware');


router.get('/summary',authenticateToken(['admin', 'empleado']),  financeController.summary);
module.exports = router;