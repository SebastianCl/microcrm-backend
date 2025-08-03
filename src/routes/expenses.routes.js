const express = require('express');
const router = express.Router();
const { createExpense,  getExpesesByDay, getExpensesById, updateExpense,  getTypesExpenses } = require('../controllers/expenses.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.post('/', authenticateToken(['admin', 'empleado']), createExpense);
router.get('/', authenticateToken(['admin', 'empleado']), getExpesesByDay);
router.get('/:id', authenticateToken(['admin', 'empleado']), getExpensesById );
router.put('/:id', authenticateToken(['admin']), updateExpense );

// type expenses
router.get('/type-of-expense',  getTypesExpenses );

module.exports = router;