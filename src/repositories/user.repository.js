const db = require('../config/db');
const ApiError = require('../utils/apiError');
const errors = require('../utils/errors');
// Create for register.
const createUser = async ({ cliente, username, password }) => {
  try {
   const existing = await db.query(
    'SELECT id_usuario FROM usuarios WHERE nombre_usuario = $1', [username]
  );

  if (existing.rows.length > 0) throw errors.USER_ALREADY_EXISTS();

  const { rows } = await db.query(
    'INSERT INTO usuarios (id_cliente, nombre_usuario, contrasena) VALUES ($1, $2, $3) RETURNING id_usuario', [cliente, username, password]
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
  const { rows } = await db.query('SELECT id_usuario, nombre_usuario FROM usuarios');
  if (rows.length === 0) throw errors.USERS_NOT_FOUND();
  return rows;
};
// User one
const getFindById = async (id) => {
  const { rows } = await db.query(
    'SELECT id_cliente, nombre_usuario, estado FROM usuarios WHERE id_usuario = $1', [id]);
  if (rows.length === 0) throw errors.USER_NOT_FOUND();
  return rows[0];
};

module.exports = { createUser, findByUsername, getAllUsers, getFindById };
