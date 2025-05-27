const expensesService = require('../services/expenses.service');

const getAllExpenses = async (req, res, next) => {
    try {
        const expenses = await expensesService.getAllExpenses();
        res.status(200).json(expenses);
    } catch (err) {
        next(err);
    }
};

const getExpenseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const expense = await expensesService.getExpenseById(id);
        res.status(200).json(expense);
    } catch (err) {
        next(err);
    }
};

const getExpensesByClientId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const expenses = await expensesService.getExpensesByClientId(id);
        res.status(200).json(expenses);
    } catch (err) {
        next(err);
    }
};

const createExpense = async (req, res, next) => {
    try {
        const { id_cliente, descripcion, monto, fecha, tipo } = req.body;
        const expenseId = await expensesService.createExpense( id_cliente, descripcion, monto, fecha, tipo);
        res.status(201).json({ message: 'Gasto creado correctamente', expenseId });
    } catch (err) {
        next(err);
    }
};

const updateExpense = async(req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await expensesService.updateExpense(id, data);
        res.status(200).json({message: 'El gasto se actualizo correctamente'});
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllExpenses, getExpenseById, getExpensesByClientId, createExpense, updateExpense };