const db = require('../config/db');
const errors = require('../utils/errors'); 

// Obtener todos los movimientos de inventario ordenados por fecha descendente
const getAllRecords = async () => {
        const {rows} = await db.query('SELECT * FROM inventarios');
        if (rows.length === 0) throw errors.INVENTARIOS_NOT_FOUND();
        return rows;
};

const getInventoryByProductId = async (id) => {
  const { rows } = await db.query('SELECT id_producto, cantidad, fecha, tipo_movimiento, comentario FROM inventarios WHERE id_producto = $1', [id]);
  if (rows.length === 0) throw errors.INVENTARIO_NOT_FOUND();
  return rows;
};

// Crear movimiento en inventarios
const createInventoryMovement = async ({ id_producto, cantidad, fecha, tipo_movimiento, comentario }) => {
  const query = `
    INSERT INTO inventarios (id_producto, cantidad, fecha, tipo_movimiento, comentario)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [id_producto, cantidad,  fecha, tipo_movimiento, comentario];
  const { rows } = await db.query(query, values);
  return rows;
};


module.exports = {
    getAllRecords,
    getInventoryByProductId,
    createInventoryMovement
};
