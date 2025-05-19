const express = require('express');
const router = express.Router();
const { getAllExpenses, getExpenseById, getExpensesByClientId, createExpense  } = require('../controllers/expenses.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken(['admin', 'empleado']), getAllExpenses);
router.get('/:id', authenticateToken(['admin', 'empleado']), getExpenseById);
router.get('/client/:id', authenticateToken(['admin', 'empleado']), getExpensesByClientId);
router.post('/', authenticateToken(['admin', 'empleado']), createExpense);


module.exports = router;