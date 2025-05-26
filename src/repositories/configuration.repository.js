const db = require('../config/db');
const errors = require('../utils/errors');

const getConfigurations = async () => {
  const { rows } = await db.query('SELECT * FROM configuraciones');
  return rows;
};

const getByClientId = async (id) => {
  const { rows } = await db.query('SELECT * FROM configuraciones WHERE id_cliente = $1', [id]);
  if (rows.length === 0) throw errors.CONFIG_NOT_FOUND();
  return rows;
};

const updateModuleStatus = async (id_cliente, modulo, activo) => {
  const query = `
    UPDATE configuraciones
    SET activo = $1
    WHERE id_cliente = $2 AND modulo = $3;
  `;
  await db.query(query, [activo, id_cliente, modulo]);
};

module.exports = {
  getConfigurations,
  getByClientId,
  updateModuleStatus
};
