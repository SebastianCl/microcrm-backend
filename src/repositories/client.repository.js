const db = require('../config/db');

const getAllClients = async () =>{
  const [rows] = await db.query('SELECT id_cliente, nombre, correo, telefono, estado FROM clientes ');
  return rows
};

const getFindById = async (id) => {
  const [rows] = await db.query(
    'SELECT id_cliente, nombre, correo, telefono, estado FROM clientes where id_cliente = ?', [id]);
  return rows[0]
};


module.exports = { getAllClients, getFindById };