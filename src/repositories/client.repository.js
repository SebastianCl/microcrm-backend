const db = require('../config/db');
const ApiError = require('../utils/apiError');
const errors = require('../utils/errors');

const getAllClients = async () => {
  const { rows } = await db.query('SELECT id_cliente, nombre, correo, telefono, estado FROM clientes ');
  if (rows.length === 0) throw errors.CLIENTS_NOT_FOUND();
  return rows;
};

const getFindById = async (id) => {
  const { rows } = await db.query(
    'SELECT id_cliente, nombre, correo, telefono, estado FROM clientes WHERE id_cliente = $1', [id]);
  if (rows.length === 0) throw errors.CLIENT_NOT_FOUND();
  return rows[0];
};

const createClient = async (name, email, phone) => {
  try {
    const existing = await db.query(
      'SELECT id_cliente FROM clientes WHERE correo = $1 OR nombre = $2', [email, name]
    );
    
    if (existing.rows.length > 0) throw errors.CLIENT_ALREADY_EXISTS();

    const { rows } = await db.query(
      'INSERT INTO clientes(nombre, correo, telefono) VALUES($1, $2, $3) RETURNING id_cliente', [name, email, phone]
    );

    return rows[0].id_cliente;
  } catch (err) {

    // Si el error es una instancia de ApiError (error personalizado),
    // lo re-lanzamos para que el middleware de manejo de errores lo procese correctamente.
    if (err instanceof ApiError) throw err;

    throw errors.CLIENT_CREATION_FAILED();
  }

};

const toggleStatus = async (id) => {
  try {

    // verificamos que si exista el cliente (getFindById lanza error si no existe)
    const existingClient =  await getFindById(id);

    await db.query(
      'UPDATE clientes SET estado = NOT estado WHERE id_cliente = $1', [existingClient.id_cliente]
    ); 
  } catch (err) {
    // Si el error es una instancia de ApiError (error personalizado),
    // lo re-lanzamos para que el middleware de manejo de errores lo procese correctamente.
    if (err instanceof ApiError) throw err;
    throw errors.CLIENT_UPDATE_FAILED();
  }
};

const updateCliente = async (id, data) => {
  try {  
    // verificamos que si exista el cliente (getFindById lanza error si no existe)
    const existingClient =  await getFindById(id);

    const keys = Object.keys(data);
    const values = Object.values(data);

    // construccion del set dinamico
    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    // Agregar el ID como último parámetro
    values.push(existingClient.id_cliente);

    // Crear y ejecutar la consulta final
    const query = `UPDATE clientes SET ${setClause} WHERE id_cliente = $${values.length}`;
    await db.query(query, values);    
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw errors.CLIENT_UPDATE_FAILED();
  }

};

module.exports = { getAllClients, getFindById, createClient, toggleStatus, updateCliente };
