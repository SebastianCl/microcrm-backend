const db = require('../config/db');
const ApiError = require('../utils/apiError');
const errors = require('../utils/errors');

const getAllProducts = async () => {
  const { rows } = await db.query(`
    SELECT 
      p.id_producto,
      p.nombre,
      p.descripcion,
      p.precio,
      p.stock,
      p.maneja_inventario,
      p.estado,
      c.id_categoria,
      c.nombre_categoria AS categoria
    FROM productos p
    JOIN categorias c ON c.id_categoria = p.id_categoria
  `);

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

const getProductAdditions = async(id) =>{
  const existingProduct = await getFindById(id);
  const {rows}  = await db.query('SELECT * FROM get_adiciones_por_producto($1)', [existingProduct.id_producto]);

  return rows[0];
};

const createProduct = async (name, description, price, stock, maneja_inventario, id_categoria) => {
  try {
    const existing = await db.query(
      'SELECT id_producto FROM productos WHERE nombre = $1 AND descripcion = $2 AND precio = $3 AND stock = $4 AND maneja_inventario = $5 AND id_producto = $6',
      [name, description, price, stock, maneja_inventario, id_categoria]
    );

    if (existing.rows.length > 0) throw errors.PRODUCT_ALREADY_EXISTS();
    const { rows } = await db.query(
      'INSERT INTO productos(nombre, descripcion, precio, stock, maneja_inventario, id_categoria) VALUES($1, $2, $3, $4, $5, $6) RETURNING id_producto',
      [name, description, price, stock, maneja_inventario, id_categoria]
    );
    return rows[0].id_producto;
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
  getProductAdditions
};
