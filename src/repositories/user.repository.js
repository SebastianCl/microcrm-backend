const db = require('../config/db');

const createUser = async ({ username, password }) => {
  const [result] = await db.query(
    'INSERT INTO usuarios (username, password) VALUES (?, ?)', [username, password]
  );
  return result.insertId;
};

const findByUsername = async (username) => {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [username]);
  return rows[0];
};

const getAllUsers = async () => {
  const [rows] = await db.query('SELECT id_usuario, nombre_usuario FROM usuarios');
  return rows;
};

module.exports = { createUser, findByUsername, getAllUsers };
