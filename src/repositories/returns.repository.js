const db = require('../config/db');
const errors = require('../utils/errors');

const getAllReturns = async () => {
    const { rows } = await db.query('SELECT * FROM devoluciones');
    if (rows.length === 0) throw errors.RETURNS_NOT_FOUND();
    return rows;
};

const getReturnById = async (id) => {
    const { rows } = await db.query('SELECT * FROM devoluciones WHERE id_devolucion = $1', [id]);
    if (rows.length === 0) throw errors.RETURN_NOT_FOUND();
    return rows[0];
};

const createReturn = async (saleId, productId, quantity, reason, date) => {
    try {
        const { rows } = await db.query(
            'INSERT INTO devoluciones (id_venta, id_producto, cantidad, motivo, fecha) VALUES ($1, $2, $3, $4, $5) RETURNING id_devolucion',
            [saleId, productId, quantity, reason, date]
        );
        return rows[0].id_devolucion;
    } catch (error) {
        throw errors.RETURN_CREATION_FAILED();
    }
};

module.exports = { getAllReturns, getReturnById, createReturn }; 