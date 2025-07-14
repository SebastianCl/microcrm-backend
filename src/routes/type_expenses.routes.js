const express = require('express');
const router = express.Router();
const {  getTypesExpenses, getTypesExpensesId, updateTypeExpenses, createTypesExpenses } = require('../controllers/expenses.controller');
const authenticateToken = require('../middlewares/auth.middleware');


// type expenses
router.post('/',  authenticateToken(['admin', 'empleado']), createTypesExpenses);
router.get('/', authenticateToken(['admin', 'empleado']), getTypesExpenses );
router.get('/:id', authenticateToken(['admin', 'empleado']),getTypesExpensesId);
router.put('/:id', authenticateToken(['admin', 'empleado']), updateTypeExpenses);

module.exports = router;