const expensesService = require('../services/expenses.service');



const createExpense = async (req, res, next) => {
    try {
        const { id_cliente, descripcion, monto, fecha, id_tipo_gasto, id_usuario } = req.body;
        const expenseId = await expensesService.createExpense( id_cliente, descripcion, monto, fecha, id_tipo_gasto, id_usuario);
        res.status(201).json({ message: 'Gasto creado correctamente', expenseId });
    } catch (err) {
        next(err);
    }
};

const getTypesExpenses = async(req, res, next) => {
    try {
        const typesExpenses = await expensesService.getTypesExpenses();
        res.status(200).json(typesExpenses);
    } catch (err) {
        next(err);
    }
};

const getExpesesByDay = async(req, res, next) => {
    try {
        const { fecha_inicio, fecha_final } = req.query;
        const Expenses = await expensesService.getExpesesByDay(fecha_inicio, fecha_final);
        res.status(200).json(Expenses);
    } catch (err) {
        next(err);
    }
    
};

module.exports = { createExpense, getTypesExpenses, getExpesesByDay };