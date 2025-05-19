const expensesRepo = require('../repositories/expenses.repository');

const getAllExpenses = async() => {
  return await expensesRepo.getAllExpenses();
};

const getExpenseById = async(id) => {
  return await expensesRepo.getExpenseById(id);
};

const getExpensesByClientId = async(id) => {
  return await expensesRepo.getExpensesByClientId(id);
};

const createExpense = async(id_cliente, descripcion, monto, fecha, tipo) => {
  return await expensesRepo.createExpense(id_cliente, descripcion, monto, fecha, tipo);
};

module.exports = { getAllExpenses, getExpenseById, getExpensesByClientId, createExpense  };