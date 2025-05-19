const express = require('express');
const router = express.Router();
const { getAllExpenses, getExpenseById, getExpensesByClientId, createExpense  } = require('../controllers/expenses.controller');
// const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', getAllExpenses);
router.get('/:id', getExpenseById);
router.get('/client/:id', getExpensesByClientId);
router.post('/', createExpense);


module.exports = router;