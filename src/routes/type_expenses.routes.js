const express = require('express');
const router = express.Router();
const {  getTypesExpenses, getTypesExpensesId, updateTypeExpenses, createTypesExpenses } = require('../controllers/expenses.controller');
const authenticateToken = require('../middlewares/auth.middleware');


// type expenses
router.post('/', createTypesExpenses)
router.get('/',  getTypesExpenses );
router.get('/:id', getTypesExpensesId)
router.put('/:id', updateTypeExpenses)

module.exports = router;