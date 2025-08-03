const db = require('../config/db');
const ApiError = require('../utils/apiError');
const errors = require('../utils/errors');

const getAllComboProducts = async () => {
  const { rows } = await db.query('SELECT * FROM combo_producto');
  if (rows.length === 0) throw errors.COMBO_PRODUCTS_NOT_FOUND();
  return rows;
};

const getComboProductById = async (id) => {
  const { rows } = await db.query('SELECT * FROM combo_producto WHERE id_combo_producto = $1', [id]);
  if (rows.length === 0) throw errors.COMBO_PRODUCT_NOT_FOUND();
  return rows[0];
};

const getProductByComboId = async (id_combo) => {
  const { rows } = await db.query('SELECT * FROM combo_producto WHERE id_combo = $1', [id_combo]);
  if (rows.length === 0) throw errors.COMBO_PRODUCT_NOT_FOUND();
  return rows;
};

const createComboProduct = async (id_combo, id_producto, cantidad) => {
  try {
    const { rows } = await db.query(
      'INSERT INTO combo_producto( id_combo, id_producto, cantidad) VALUES($1, $2, $3) RETURNING id_combo_producto',
      [id_combo, id_producto, cantidad]
    );
    return rows[0].id_combo_producto;
  } catch (err) {
    
    if (err instanceof ApiError) throw err;
    throw errors.COMBO_CREATION_FAILED();
  }
};

const updateComboProduct = async (id, data) => {
  try {
    const existing = await getComboProductById(id);
    const keys = Object.keys(data);
    const values = Object.values(data);

    const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(', ');
    values.push(existing.id_combo_producto);

    const query = `UPDATE combo_producto SET ${setClause} WHERE id_combo_producto = $${values.length}`;
    
    await db.query(query, values);
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw errors.COMBO_PRODUCT_UPDATE_FAILED();
  }
};



module.exports = {
  getAllComboProducts,
  getComboProductById,
  getProductByComboId,
  createComboProduct,
  updateComboProduct,
};