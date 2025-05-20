const db = require('../config/db');
const errors = require('../utils/errors');

const getAllExpenses = async() =>{
    const { rows } = await db.query('SELECT id_gasto, id_cliente, descripcion, monto, fecha, tipo FROM gastos');
    if(rows.length === 0) throw errors.EXPENSES_NOT_FOUND();
    return rows;
};

const getExpenseById = async(id) => {
    const { rows } = await db.query('SELECT id_gasto, id_cliente, descripcion, monto, fecha, tipo FROM gastos WHERE id_gasto = $1', [id]);
    if(rows.length === 0) throw errors.EXPENSE_NOT_FOUND();
    return rows[0];
};

const getExpensesByClientId = async(id) => {
    const { rows } = await db.query('SELECT id_gasto, id_cliente, descripcion, monto, fecha, tipo FROM gastos WHERE id_cliente = $1', [id]);
    if(rows.length === 0) throw errors.EXPENSE_NOT_FOUND();
    return rows;
};

const createExpense = async( id_cliente, descripcion, monto, fecha, tipo ) => {
  try {
    const { rows } = await db.query(
      'INSERT INTO gastos( id_cliente, descripcion, monto, fecha, tipo) VALUES($1,$2,$3,$4,$5) RETURNING id_gasto ', [ id_cliente, descripcion, monto, fecha, tipo]
    );

    return rows[0].id_gasto;
  } catch (error) {
    throw errors.EXPENSE_CREATION_FAILED();
  }
};

module.exports = { getAllExpenses, getExpenseById, getExpensesByClientId, createExpense  };