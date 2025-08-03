const combosRepo = require('../repositories/combos.repository');

const listCombos  = async () => {
  return await combosRepo.getCombos();
};

const getComboById = async (id) => {
  return await combosRepo.getComboById(id);
};

const createCombo = async (nombre, descripcion, precio_combo) => {
  return await combosRepo.createCombo(nombre, descripcion, precio_combo);
};

const updateStatus = async (id) => {
  return await combosRepo.updateStatus(id);
};

const updateCombo = async (id, data) => {
  return await combosRepo.updateCombo(id, data);
};

module.exports = {
  listCombos ,
  getComboById,
  createCombo,
  updateStatus,
  updateCombo
};
