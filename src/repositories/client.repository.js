const db = require('../config/db');

const getAllClients = async () => {
  const { rows } = await db.query('SELECT id_cliente, nombre, correo, telefono, estado FROM clientes ');
  return rows;
};

const getFindById = async (id) => {
  const { rows } = await db.query(
    'SELECT id_cliente, nombre, correo, telefono, estado FROM clientes WHERE id_cliente = $1', [id]);
  return rows[0];
};

const createClient = async(name, email, phone) =>{
  const { rows } = await db.query(
    'INSERT INTO clientes(nombre, correo, telefono) VALUES($1, $2, $3) RETURNING id_cliente', [name, email, phone]
  );
  return rows[0].id_cliente;
};

const deleteClient = async(id) =>{
  const result = await db.query(
    'DELETE FROM clientes WHERE id_cliente = $1', [id]
  );
  
  if(result.rowCount === 0) throw new Error('Error al eliminar el cliente o cliente no encontrado');
};

module.exports = { getAllClients, getFindById, createClient, deleteClient };
