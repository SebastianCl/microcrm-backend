const express = require('express');
const router = express.Router();
const { createExpense,  getExpesesByDay, getExpensesById, updateExpense,  getTypesExpenses } = require('../controllers/expenses.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.post('/', createExpense);
router.get('/',  getExpesesByDay);
router.get('/:id', getExpensesById );
router.put('/:id',  updateExpense );






// type expenses
router.get('/type-of-expense', authenticateToken(['admin', 'empleado']),  getTypesExpenses );

module.exports = router;