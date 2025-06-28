const express = require('express');
const router = express.Router();
const { createExpense, getTypesExpenses, getExpesesByDay  } = require('../controllers/expenses.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.post('/', authenticateToken(['admin', 'empleado']), createExpense);
router.get('/type-of-expense', authenticateToken(['admin', 'empleado']),  getTypesExpenses );
router.get('/', authenticateToken(['admin', 'empleado']), getExpesesByDay);
module.exports = router;