const configRepo = require('../repositories/configuration.repository');

const getAllConfigurations = async () => {
  return await configRepo.getConfigurations();
};

const getByClientId = async (id_cliente) => {
  return await configRepo.getByClientId(id_cliente);
};

const updateModuleStatus = async (id_cliente, modulo, activo) => {
  return await configRepo.updateModuleStatus(id_cliente, modulo, activo);
};

module.exports = {
  getAllConfigurations,
  getByClientId,
  updateModuleStatus
};

