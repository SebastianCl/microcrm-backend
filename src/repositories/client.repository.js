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

const deleteClient = async(id) =>{
  const [result] = await db.query(
    'DELETE FROM clientes WHERE id_cliente = ?', [id]
  );
  if(result.affectedRows === 0) throw new Error('Error al eliminar el cliente');
};

module.exports = { getAllClients, getFindById, createClient, deleteClient };
