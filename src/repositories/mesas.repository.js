const db = require('../config/db');
const ApiError = require('../utils/apiError');
const errors = require('../utils/errors');

const getAllMesas = async() => {
  const { rows } = await db.query('SELECT id_mesa, id_cliente, nombre_mesa, activa FROM mesas');
  if(rows.length === 0) throw errors.MESAS_NOT_FOUND();
  return rows;
};

const getMesaById = async(id) => {
  const { rows } = await db.query('SELECT id_mesa, id_cliente, nombre_mesa, activa FROM mesas WHERE id_mesa = $1', [id]);

  if(rows.length === 0) throw errors.MESA_NOT_FOUND();

  return rows[0];
};

const createMesa = async(id_cliente, nombre_mesa) =>{
  try {
    const existingMesa = await db.query(
    'SELECT id_mesa FROM mesas WHERE nombre_mesa = $1', [nombre_mesa]
  );

    if(existingMesa.rows.length > 0) throw errors.MESA_ALREADY_EXISTS();

    const { rows } = await db.query(
      'INSERT INTO mesas(id_cliente, nombre_mesa) VALUES($1, $2) RETURNING id_mesa',[id_cliente,  nombre_mesa]
    );

    return rows[0].id_mesa;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw errors.MESA_CREATION_FAILED();
  }
};

const toggleMesaStatus = async(id) =>{
  try {
    const existingMesa = await getMesaById(id);
    console.log(existingMesa.id_mesa);
    await db.query('UPDATE mesas SET activa = NOT activa WHERE id_mesa = $1', [existingMesa.id_mesa]);
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw errors.MESA_CREATION_FAILED();
  }
};

const updateMesa = async(id, data) => {
  try {
    const existingMesa = await getMesaById(id);
    const keys = Object.keys(data);
    const values = Object.values(data);

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

      values.push(existingMesa.id_mesa);

    const query = `UPDATE mesas SET ${setClause} WHERE id_mesa = $${values.length}`;
    await db.query(query, values);
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) throw err;
    throw errors.MESA_CREATION_FAILED();
  }
};
module.exports = { getAllMesas, getMesaById, createMesa, toggleMesaStatus, updateMesa };