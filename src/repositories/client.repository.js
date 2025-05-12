const db = require('../config/db');

const getAllClients = async () => {
  const [rows] = await db.query('SELECT id_cliente, nombre, correo, telefono, estado FROM clientes ');
  return rows;
};

const getFindById = async (id) => {
  const [rows] = await db.query(
    'SELECT id_cliente, nombre, correo, telefono, estado FROM clientes where id_cliente = ?', [id]);
  return rows[0];
};

const createClient = async(name, email, phone) =>{
  const [result] = await db.query(
    'INSERT INTO clientes(nombre, correo, telefono) VALUES(?,?,?)', [name, email, phone]
  );
  return result.insertId;
};

module.exports = { getAllClients, getFindById, createClient };
