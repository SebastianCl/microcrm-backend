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

const getExpesesByDay = async(req, res, next) => {
    try {
        const { fecha_inicio, fecha_final } = req.query;
        const Expenses = await expensesService.getExpesesByDay(fecha_inicio, fecha_final);
        res.status(200).json(Expenses);
    } catch (err) {
        next(err);
    }
    
};

const getExpensesById = async(req, res, next) => {
    try {
        const {id} = req.params;
        const expense = await expensesService.getExpensesById(id);
        res.status(200).json(expense)
    } catch (error) {
        next(err);
    }
};

const updateExpense = async(req, res, next) => {
   try {
          const { id } = req.params;
          const data = req.body;
          await expensesService.updateExpense(id, data);;
          res.status(200).json({ message: 'gasto actualizado correctamente' });
        } catch (err) {
          next(err);
      }
};

// Type Expenses

const createTypesExpenses = async (req, res, next) => {
    try {
        const { nombre_tipo, descripcion } = req.body;
        console.log(nombre_tipo, descripcion)
        const expenseId = await expensesService.createTypesExpenses( nombre_tipo, descripcion);
        res.status(201).json({ message: 'tipo de gasto creado correctamente', expenseId });
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

const getTypesExpensesId = async(req, res, next) => {
    try {
        const {id} = req.params;
        const typesExpense = await expensesService.getTypesExpensesId(id);
        res.status(200).json(typesExpense);
    } catch (err) {
        next(err);
    }
};

const updateTypeExpenses = async(req, res, next) => {
   try {
          const { id } = req.params;
          const data = req.body;
          await expensesService.updateTypeExpenses(id, data);;
          res.status(200).json({ message: 'typo de gasto actualizado correctamente' });
        } catch (err) {
          next(err);
      }
};


module.exports = {  
    createExpense, 
    getExpesesByDay, 
    getExpensesById, 
    updateExpense,
    createTypesExpenses, 
    getTypesExpenses, 
    getTypesExpensesId,
    updateTypeExpenses 
};