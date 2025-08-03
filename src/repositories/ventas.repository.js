const db = require('../config/db');
const errors = require('../utils/errors');
const ApiError = require('../utils/apiError');

const getAllVentas = async () => {
    const { rows } =  await db.query('SELECT id_venta, id_cliente, id_usuario, fecha, total FROM ventas');
    if(rows.length === 0) throw errors.VENTAS_NOT_FOUND();
    return rows;
};

const getSubtotal = async () => {
    const { rows } =  await db.query(`SELECT 
    COALESCE((
        SELECT SUM(v.total)
        FROM ventas v
        WHERE DATE(v.fecha) = CURRENT_DATE
    ), 0) AS total_venta,
    COALESCE((
        SELECT SUM(g.monto)
        FROM gastos g
        WHERE DATE(g.fecha) = CURRENT_DATE
    ), 0) AS total_gastos,
    COALESCE((
        SELECT COUNT(*)
        FROM pedidos p
        JOIN estado e ON e.id_estado = p.id_estado
        WHERE e.nombre_estado = 'Pendiente'
          AND DATE(p.fecha) = CURRENT_DATE
    ), 0) AS total_pen`);
    if(rows.length === 0) throw errors.VENTAS_NOT_FOUND();
    return rows;
};

const getVentaById = async (id) => {
    const { rows } =  await db.query('SELECT id_venta, id_cliente, id_usuario, fecha, total FROM ventas WHERE id_venta = $1', [id]);
    if(rows.length === 0 ) throw errors.VENTA_NOT_FOUND();
    return rows[0];
};

const getDetallesVentaById = async(id) => {
    const {rows}  = await db.query('SELECT * FROM get_detalle_venta($1)', [id]);
    if(rows.length === 0) throw errors.DETALLES_VETA_NOT_FOUND();
    return rows;
};

const createVenta = async (id_cliente, id_usuario, id_pedido, fecha, total) => {
    try {
        const { rows } = await db.query('INSERT INTO ventas (id_cliente, id_usuario, fecha, total,id_pedido) VALUES ($1, $2, $3, $4, $5) RETURNING id_venta', [id_cliente, id_usuario, fecha, total, id_pedido]);
        return rows[0].id_venta;
    } catch (err) {
        if (err instanceof ApiError) throw err;
        throw errors.VENTA_CREATION_FAILED();
    }

};

const insertarDetalleVenta = async(id_venta, producto ) => {
    try {
        const {  id_producto, cantidad, precio_unitario, id_adicion } = producto;
        const { rows } = await db.query('INSERT INTO detalle_venta(id_venta, id_producto, cantidad, precio_unitario, id_adicion) VALUES($1,$2,$3,$4,$5) RETURNING id_detalle_venta ', [id_venta, id_producto, cantidad, precio_unitario,id_adicion]);
        return rows[0].id_detalle_venta;
    } catch (err) {
        if (err instanceof ApiError) throw err;
        throw errors.DETALLES_VENTAS_CREATION_FAILED();
    }
};

const getVentasPorFecha = async ({ fecha, fecha_inicio, fecha_fin }) => {
  let query = 'SELECT * FROM get_ventas_por_fecha($1, $2, $3)';
  let values = [
    fecha || null,
    fecha_inicio || null,
    fecha_fin || null
  ];

  const result = await db.query(query, values);
  return result.rows;
};
module.exports = { 
    getAllVentas, 
    getVentaById, 
    getDetallesVentaById,
    createVenta, 
    insertarDetalleVenta, 
    getVentasPorFecha,
    getSubtotal
}; 