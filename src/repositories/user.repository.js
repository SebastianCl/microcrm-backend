const db = require('../config/db');

const createUser = async ({ username, password }) => {
  const { rows } = await db.query(
    'INSERT INTO usuarios (username, password) VALUES ($1, $2) RETURNING id_usuario', [username, password]
  );
  return rows[0].id_usuario;
};

const findByUsername = async (username) => {
  const { rows } = await db.query('SELECT * FROM usuarios WHERE nombre_usuario = $1', [username]);
  return rows[0];
};

const getAllUsers = async () => {
  const { rows } = await db.query('SELECT id_usuario, nombre_usuario FROM usuarios');
  return rows;
};

module.exports = { createUser, findByUsername, getAllUsers };
