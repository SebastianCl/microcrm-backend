const db = require('../config/db');
const ApiError = require('../utils/apiError');
const errors = require('../utils/errors');

const getCombos = async () => {
  const { rows } = await db.query('SELECT id_combo, nombre, descripcion, precio_combo, estado FROM combos');
  if (rows.length === 0) throw errors.COMBOS_NOT_FOUND();
  return rows;
};

const getComboById = async (id) => {
  const { rows } = await db.query('SELECT id_combo, nombre, descripcion, precio_combo, estado FROM combos WHERE id_combo = $1', [id]);
  if (rows.length === 0) throw errors.COMBO_NOT_FOUND();
  return rows[0];
};

const createCombo = async (nombre, descripcion, precio_combo) => {
  try {
    const existing = await db.query(
      'SELECT id_combo FROM combos WHERE nombre = $1',
      [nombre]
    );

    if (existing.rows.length > 0) throw errors.COMBO_ALREADY_EXISTS();

    const { rows } = await db.query(
      'INSERT INTO combos(nombre, descripcion, precio_combo, estado) VALUES($1, $2, $3, $4) RETURNING id_combo',
      [nombre, descripcion, precio_combo, true]
    );

    return rows[0].id_combo;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw errors.COMBO_CREATION_FAILED();
  }
};

const updateCombo = async (id, data) => {
  try {
    const existing = await getComboById(id);
    const keys = Object.keys(data);
    const values = Object.values(data);

    const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(', ');
    values.push(existing.id_combo);

    const query = `UPDATE combos SET ${setClause} WHERE id_combo = $${values.length}`;
    await db.query(query, values);
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw errors.COMBO_UPDATE_FAILED();
  }
};

const updateStatus = async (id) => {
  try {
    const existing = await getComboById(id);
    await db.query('UPDATE combos SET estado = NOT estado WHERE id_combo = $1', [existing.id_combo]);
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw errors.COMBO_UPDATE_FAILED();
  }
};

module.exports = {
  getCombos,
  getComboById,
  createCombo,
  updateCombo,
  updateStatus
};
