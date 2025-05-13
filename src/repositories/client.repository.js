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
  
  const existing = await db.query(
    'SELECT id_cliente FROM clientes WHERE correo = $1 OR nombre = $2', [email, name]
  );
  
  if(existing.rows.length > 0) return {
    status: false,
    message: 'Cliente ya registrado con ese nombre o correo'
  };

  const { rows } = await db.query(
    'INSERT INTO clientes(nombre, correo, telefono) VALUES($1, $2, $3) RETURNING id_cliente', [name, email, phone]
  );
  return rows[0].id_cliente;
};

const updateStatus = async(id) =>{
  const result = await db.query(
    'UPDATE clientes SET estado = NOT estado WHERE id_cliente = $1', [id]
  );
  
  if(result.rowCount === 0) throw new Error('Error al actulizar el estado del cliente  o cliente no encontrado');
};

const updateCliente = async(id, data) =>{
  const keys = Object.keys(data);
  const values = Object.values(data);

  // construccion del set dinamico
  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(', ');


  // Agregar el ID como último parámetro
  values.push(id);
  
  // Crear y ejecutar la consulta final
  const query = `UPDATE clientes SET ${setClause} WHERE id_cliente = $${values.length}`;
  const result = await db.query(query, values);
  if(result.rowCount === 0) throw new Error('Error al actulizar el cliente  o cliente no encontrado');
};

module.exports = { getAllClients, getFindById, createClient, updateStatus, updateCliente };
