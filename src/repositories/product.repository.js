const db = require('../config/db');
const ApiError = require('../utils/apiError');
const errors = require('../utils/errors');

const getAllProducts = async () => {
  const { rows } = await db.query('SELECT id_producto, nombre, descripcion, precio, stock, estado FROM productos');
  if (rows.length === 0) throw errors.PRODUCTS_NOT_FOUND();
  return rows;
};

const getFindById = async (id) => {
  const { rows } = await db.query(
    'SELECT id_producto, nombre, descripcion, precio, stock, estado FROM productos WHERE id_producto = $1', 
    [id]
  );
  if (rows.length === 0) throw errors.PRODUCT_NOT_FOUND();
  return rows[0];
};

const createProduct = async (name, description, price, stock) => {
  try {
    const existing = await db.query(
      'SELECT id_producto FROM productos WHERE nombre = $1 AND descripcion = $2 AND precio = $3 AND stock = $4', 
      [name, description, price, stock]
    );

    if (existing.rows.length > 0) throw errors.PRODUCT_ALREADY_EXISTS();
    const { rows } = await db.query(
      'INSERT INTO productos(nombre, descripcion, precio, stock) VALUES($1, $2, $3, $4) RETURNING id_producto',
      [name, description, price, stock]
    );


    console.log(rows[0].id_producto);
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw errors.PRODUCT_CREATION_FAILED();
  }
};

const updateStatus = async (id) => {
  try {
    const existingProduct = await getFindById(id);

    await db.query(
      'UPDATE productos SET estado = NOT estado WHERE id_producto = $1',
      [existingProduct.id_producto]
    );
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw errors.PRODUCT_UPDATE_FAILED();
  }
};

const updateProduct = async (id, data) => {
  try {
    const existingProduct = await getFindById(id);

    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) throw errors.PRODUCT_UPDATE_FAILED();

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    values.push(existingProduct.id_producto);

    const query = `UPDATE productos SET ${setClause} WHERE id_producto = $${values.length}`;
    await db.query(query, values);
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw errors.PRODUCT_UPDATE_FAILED();
  }
};

module.exports = {
  getAllProducts,
  getFindById,
  createProduct,
  updateStatus,
  updateProduct,
};
