const expensesRepo = require('../repositories/expenses.repository');



const createExpense = async( id_cliente, descripcion, monto, fecha, id_tipo_gasto, id_usuario) => {
  return await expensesRepo.createExpense( id_cliente, descripcion, monto, fecha, id_tipo_gasto, id_usuario);
};

const getTypesExpenses = async() => {
  return await expensesRepo.getTypesExpenses();
};

const getExpesesByDay = async(fecha_inicio = null, fecha_final = null) => {
  return await expensesRepo.getExpesesByDay(fecha_inicio , fecha_final);

};
module.exports = {  createExpense, getTypesExpenses, getExpesesByDay  };