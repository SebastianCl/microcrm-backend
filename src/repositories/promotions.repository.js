const db = require('../config/db');
const ApiError = require('../utils/apiError');
const errors = require('../utils/errors');


const getAllPromotions = async () => {
  const { rows } = await db.query('SELECT id_promocion, nombre, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin, estado FROM promociones');
  if (rows.length === 0) throw errors.PROMOTIONS_NOT_FOUND();
  return rows[0];
};

const getPromotionById = async (id) => {
  const { rows } = await db.query('SELECT id_promocion, nombre, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin, estado FROM promociones WHERE id_promocion = $1', [id]);
  if (rows.length === 0) throw errors.PROMOTION_NOT_FOUND();
  return rows[0];
};

const createPromotion = async(nombre, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin) => {
  try {
    const existing = await db.query(
    'SELECT id_promocion FROM promociones WHERE nombre = $1', [nombre]);

    if(existing.rows.length > 0) throw errors.PROMOTION_ALREADY_EXISTS();
    console.log(nombre, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin);
    const {rows} = await db.query(
      'INSERT INTO promociones(nombre,descripcion,descuento_porcentaje,fecha_inicio,fecha_fin) VALUES($1, $2, $3, $4, $5) RETURNING id_promocion', [nombre, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin]);
    return rows[0].id_promocion;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw errors.PROMOTION_CREATION_FAILED();
  }
};

const togglePromotionStatus = async (id) => {
  try {
    const existingPromotion = await getPromotionById(id);
    await db.query('UPDATE promociones SET estado = NOT estado WHERE id_promocion = $1', [existingPromotion.id_promocion]);
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw errors.PROMOTION_UPDATE_FAILED();
  }
};

async function updatePromotions(id, data) {
  try {
    const existingPromotion = await getPromotionById(id);

    const keys = Object.keys(data);
    const values = Object.values(data);

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    values.push(existingPromotion.id_promocion);

    const query = `UPDATE promociones SET ${setClause} WHERE id_promocion =  $${values.length}`;
    await db.query(query, values);
  } catch (error) {
    throw errors.PROMOTION_UPDATE_FAILED();
  }
}

module.exports = { getAllPromotions, getPromotionById, togglePromotionStatus, updatePromotions, createPromotion };

