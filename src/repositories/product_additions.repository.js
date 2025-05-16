const db = require('../config/db');
const ApiError = require('../utils/apiError');
const errors = require('../utils/errors');

const getAllProductAdditions = async() =>{
  const { rows } = await db.query('SELECT id_adicion, id_producto, nombre, precio_extra, estado FROM adiciones_producto');
  if(rows.length === 0) throw errors.ADDITIONS_NOT_FOUND();
  return rows;
};

const getProductAdditionById = async(id) => {

  const { rows } = await db.query('SELECT id_adicion, id_producto, nombre, precio_extra, estado FROM adiciones_producto WHERE id_adicion = $1', [id]);

  
  if(rows.length === 0) throw errors.ADDITION_NOT_FOUND();
  return rows[0];
};

const toggleProductAdditionStatus = async(id) => {
  try {
    const existingProductAddition = await getProductAdditionById(id);

    await db.query('UPDATE adiciones_producto SET estado = NOT estado WHERE id_adicion = $1', [existingProductAddition.id_adicion]);

  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw errors.ADDITION_UPDATE_FAILED();
  }
};

const createProductAddition = async(idproducto, nombre, precioExtra) => {
  try {

  const exists = await db.query(
  'SELECT 1 FROM adiciones_producto WHERE id_producto = $1 AND LOWER(nombre) = LOWER($2)',
  [idproducto, nombre]);

  if (exists.rowCount > 0) {
    throw errors.ADDITION_ALREADY_EXISTS();
  }

  const { rows } = await db.query('INSERT INTO adiciones_producto(id_producto, nombre, precio_extra) VALUES($1, $2, $3) RETURNING id_adicion', [idproducto, nombre, precioExtra]);

  return rows[0].id_adicion;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw errors.CLIENT_CREATION_FAILED();
  }
};

const updateAddition = async(id, data) =>{
  try {
    const existingAddition = await getProductAdditionById(id);

    const keys = Object.keys(data);
    const values = Object.values(data);

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

      values.push(existingAddition.id_adicion);

      const query = (`UPDATE adiciones_producto SET ${setClause} WHERE id_adicion = $${values.length}`);
      await db.query(query, values);
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw errors.ADDITION_UPDATE_FAILED();
  }
};

module.exports = { getAllProductAdditions, getProductAdditionById, toggleProductAdditionStatus, createProductAddition, updateAddition };