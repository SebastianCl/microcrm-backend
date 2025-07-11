const expensesRepo = require('../repositories/expenses.repository');



const createExpense = async( id_cliente, descripcion, monto, fecha, id_tipo_gasto, id_usuario) => {
  return await expensesRepo.createExpense( id_cliente, descripcion, monto, fecha, id_tipo_gasto, id_usuario);
};

const getExpesesByDay = async(fecha_inicio = null, fecha_final = null) => {
  return await expensesRepo.getExpesesByDay(fecha_inicio , fecha_final);

};

const getExpensesById = async(id) => {
  return await expensesRepo.getExpensesById(id);
};

const updateExpense = async(id, data) => {
  return await expensesRepo.updateExpense(id, data)
};

// tipo de gastos
const createTypesExpenses = async( nombre_tipo, descripcion) => {
  return await expensesRepo.createTypesExpenses( nombre_tipo, descripcion);
};

const getTypesExpenses = async() => {
  return await expensesRepo.getTypesExpenses();
};


const getTypesExpensesId = async(id) => {
  return await expensesRepo.getTypesExpensesId(id)
}

const updateTypeExpenses = async(id, data) => {
  return await expensesRepo.updateTypeExpenses(id, data)
};


module.exports = {   
  createExpense, 
  getExpesesByDay, 
  getExpensesById, 
  updateExpense,
  createTypesExpenses, 
  getTypesExpenses,
  getTypesExpensesId,
  updateTypeExpenses  };