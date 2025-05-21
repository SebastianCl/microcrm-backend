const db = require('../config/db');
const errors = require('../utils/errors');
const ApiError = require('../utils/apiError');

const getAllVentas = async () => {
    const { rows } =  await db.query('SELECT id_venta, id_cliente, id_usuario, fecha, total FROM ventas');
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

const createVenta = async (id_cliente, id_usuario, fecha, total) => {
    try {
        const { rows } = await db.query('INSERT INTO ventas (id_cliente, id_usuario, fecha, total) VALUES ($1, $2, $3, $4) RETURNING id_venta', [id_cliente, id_usuario, fecha,  total]);
        return rows[0].id_venta;
    } catch (err) {
        if (err instanceof ApiError) throw err;
        throw errors.VENTA_CREATION_FAILED();
    }

};

const insertarDetalleVenta = async(id_venta, producto ) => {
    try {
        const {  id_producto, cantidad, precio_unitario } = producto;
        const { rows } = await db.query('INSERT INTO detalle_venta(id_venta, id_producto, cantidad, precio_unitario) VALUES($1,$2,$3,$4) RETURNING id_detalle_venta ', [id_venta, id_producto, cantidad, precio_unitario]);
        return rows[0].id_detalle_venta;
    } catch (err) {
        if (err instanceof ApiError) throw err;
        throw errors.DETALLES_VENTAS_CREATION_FAILED();
    }
};
module.exports = { getAllVentas, getVentaById, getDetallesVentaById ,createVenta, insertarDetalleVenta }; 