const db = require('../config/db');
const ApiError = require('../utils/apiError');
const errors = require('../utils/errors');
// Create for register.
const createUser = async ({id_client, username, password, rol }) => {
  try {
   const existing = await db.query(
    'SELECT id_usuario FROM usuarios WHERE nombre_usuario = $1', [username]
  );
    if (existing.rows.length > 0) throw errors.USER_ALREADY_EXISTS();

  const { rows } = await db.query(
    'INSERT INTO usuarios (id_cliente, nombre_usuario, contrasena, rol) VALUES ($1, $2, $3, $4) RETURNING id_usuario', [id_client, username, password, rol]
  );
  return rows[0].id_usuario;

  } catch (err) {
    if (err instanceof ApiError) throw err;

    throw errors.USER_CREATION_FAILED();
    
  }
};
// Login.
const findByUsername = async (username) => {
  const { rows } = await db.query('SELECT * FROM usuarios WHERE nombre_usuario = $1', [username]);
  if (rows.length === 0) throw errors.USER_NOT_FOUND();
  return rows[0];
};
// All Users.
const getAllUsers = async () => {
  const { rows } = await db.query('SELECT id_usuario, nombre_usuario, rol, estado FROM usuarios');
  if (rows.length === 0) throw errors.USERS_NOT_FOUND();
  return rows;
};
// User one
const getFindById = async (id) => {
  const { rows } = await db.query(
    'SELECT id_usuario, id_cliente, nombre_usuario, rol, estado FROM usuarios WHERE id_usuario = $1', [id]);
  if (rows.length === 0) throw errors.USER_NOT_FOUND();
  return rows[0];
};


const updateStatus = async (id) => {
  try {
    const existingUser =  await getFindById(id);
    await db.query(
      'UPDATE usuarios SET estado = NOT estado WHERE id_usuario = $1', [existingUser.id_usuario]
    ); 
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw errors.USER_UPDATE_FAILED();
  }
};

const resetPassword = async({id, newPassword}) => {
  try {
    const existingUser =  await getFindById(id);
    await db.query(
      'UPDATE usuarios SET contrasena = $1 WHERE id_usuario = $2', [newPassword, existingUser.id_usuario]
    ); 
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw errors.USER_UPDATE_FAILED();
  }
};

const updateUser = async (id, data) => {
  try {
    const existingUser = await getFindById(id);

    const keys = Object.keys(data);
    const values = Object.values(data);

    if(keys.includes('contrasena') || keys.includes('estado') || keys.includes('id_client')) throw errors.USER_REQ_FAILED_INFO();
    if (keys.length === 0) throw errors.USER_UPDATE_FAILED();

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    values.push(existingUser.id_usuario);

    const query = `UPDATE usuarios SET ${setClause} WHERE id_usuario = $${values.length}`;
    await db.query(query, values);
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw errors.USER_UPDATE_FAILED();
  }
};
module.exports = { createUser, findByUsername, getAllUsers, getFindById, updateStatus, resetPassword, updateUser };
