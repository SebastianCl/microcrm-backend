const express = require('express');
const router = express.Router();
const { getAllReturns, getReturnById, createReturn } = require('../controllers/returns.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', getAllReturns);
router.get('/:id', getReturnById);
router.post('/', createReturn);

module.exports = router; 