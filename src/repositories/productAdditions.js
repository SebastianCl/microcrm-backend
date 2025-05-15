const db = require('../config/db');
const ApiError = require('../utils/apiError');
const errors = require('../utils/errors');

const getAllProductAdditions = async() =>{
  const { rows } = await db.query('SELECT id_adicion, id_producto, nombre, precio_extra, estado FROM adiciones_produco');
  if(rows.length === 0) throw errors.CLIENTS_NOT_FOUND();

  return rows;
  
};


module.exports = {getAllProductAdditions};