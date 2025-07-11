const db = require('../config/db');
const errors = require('../utils/errors');
const ApiError = require('../utils/apiError');


const createExpense = async(id_cliente, descripcion, monto, fecha, id_tipo_gasto, id_usuario ) => {
  try {
    const { rows } = await db.query(
      'INSERT INTO gastos(id_cliente, descripcion, monto, fecha, id_tipo_gasto, id_usuario) VALUES($1,$2,$3,$4,$5,$6) RETURNING id_gasto ', [id_cliente, descripcion, monto, fecha, id_tipo_gasto, id_usuario]
    );

    return rows[0].id_gasto;
  } catch (error) {
    throw errors.EXPENSE_CREATION_FAILED();
  }
};

const getExpensesById = async(id) => {
  try {
    const {rows} = await db.query('SELECT * from gastos WHERE id_gasto = $1', [id]);
    return rows[0]
  } catch (error) {
    throw errors.EXPENSES_NOT_FOUND();
  }
}

const updateExpense = async(id, data) => {
  try {
      const existingExpense = await getExpensesById(id);

      const keys = Object.keys(data);
      const values = Object.values(data);
      if (keys.length === 0) throw errors.EXPENSES_UPDATE();

      const setClause = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(', ');

      values.push(existingExpense.id_gasto);
      const query = `UPDATE gastos SET ${setClause} WHERE id_gasto = $${values.length}`;
      await db.query(query, values);
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw errors.EXPENSES_UPDATE();
    }
}



const getExpesesByDay = async(fecha_inicio, fecha_final) => {
  try {
    const {rows} = await db.query('SELECT * FROM get_gastos_por_fecha($1, $2)', [fecha_inicio, fecha_final]);
    if (rows.length === 0) throw errors.EXPENSES_NOT_FOUND();
    return rows;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw errors.EXPENSES_FAILED();
  }
};







// tipos de gastos
const getTypesExpenses = async() => {
  try {
    const {rows} = await db.query('select id_tipo_gasto, nombre_tipo, descripcion from tipos_gasto');
    return rows;
  } catch (error) {
    throw errors.TYPE_EXPENSES_FAILED();
  }
};


module.exports = { createExpense, getExpesesByDay, getExpensesById, updateExpense, getTypesExpenses};