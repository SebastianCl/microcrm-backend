const db = require('../config/db');
const errors = require('../utils/errors');

const pedidos_por_tipo = async (fecha_inicio, fecha_final) => {
  try {
    const { rows } = await db.query('SELECT * FROM get_pedidos_por_tipo($1, $2)', [fecha_inicio, fecha_final]);
    return rows;
  } catch (error) {
    // mejorar el manejo de errores
    throw errors.FINANCE_SUMMARY_FAILED();
  }
};

const ventas_por_medio_pago = async (fecha_inicio, fecha_final) => {
  try {
    const { rows } = await db.query('SELECT * FROM get_totales_por_medio_pago($1, $2)', [fecha_inicio, fecha_final]);
    return rows;
  } catch (error) {
    // mejorar el manejo de errores
    throw errors.FINANCE_SUMMARY_FAILED();
  }
};

const top_productos_mas_vendidos = async (fecha_inicio, fecha_final) => {
  try {
    const { rows } = await db.query('SELECT * FROM get_top_productos_mas_vendidos($1, $2)', [fecha_inicio, fecha_final]);
    return rows;
  } catch (error) {
    // mejorar el manejo de errores
    throw errors.FINANCE_SUMMARY_FAILED();
  }
};

const productos_con_menos_stock = async () => {
  try {
    const { rows } = await db.query(`SELECT id_producto, nombre, stock
      FROM productos
      WHERE maneja_inventario = TRUE
      ORDER BY stock ASC NULLS FIRST
      LIMIT 5`);
    return rows;
  } catch (error) {
    // mejorar el manejo de errores
    throw errors.FINANCE_SUMMARY_FAILED();
  }
};

const total_gastos_fecha = async(fecha_inicio, fecha_final) => {
  try {
    const {rows} = await db.query('SELECT * FROM get_gastos_por_fecha($1, $2)', [fecha_inicio, fecha_final]);
    return rows;
  } catch (err) {
    throw errors.FINANCE_SUMMARY_FAILED();
  }
};



module.exports = {
  pedidos_por_tipo,
  ventas_por_medio_pago,
  top_productos_mas_vendidos,
  productos_con_menos_stock,
  total_gastos_fecha
};