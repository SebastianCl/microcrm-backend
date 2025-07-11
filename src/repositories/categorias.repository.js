const db = require('../config/db');
const errors = require('../utils/errors');
const ApiError = require('../utils/apiError');
const { currentLineHeight } = require('pdfkit');

const getAll = async () => {
  const { rows } = await db.query('SELECT id_categoria, nombre_categoria FROM categorias');
  if (rows.length === 0) throw errors.CATEGORIES_NOT_FOUND();
  return rows;
};

const getById = async (id) => {
  const { rows } = await db.query('SELECT id_categoria, nombre_categoria FROM categorias WHERE id_categoria = $1', [id]);
  if (rows.length === 0) throw errors.CATEGORY_NOT_FOUND();
  return rows[0];
};

const create = async (nombre_categoria) => {
  try { 
    const { rows } = await db.query(
      'INSERT INTO categorias(nombre_categoria) VALUES ($1) RETURNING id_categoria', [nombre_categoria]
    );
    return rows[0].id_categoria;
  } catch (err) {
    console.log(err)
    throw errors.CATEGORY_CREATION_FAILED();
  }
};


const updateCategory = async (id, nombre_categoria) => {
  const existing = await getById(id);
  await db.query('UPDATE categorias SET nombre_categoria = $1 WHERE id_categoria = $2', [nombre_categoria, id]);
};

module.exports = { getAll, getById, create, updateCategory };
