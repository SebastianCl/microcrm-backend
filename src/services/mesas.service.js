const mesasRepo = require('../repositories/mesas.repository');

const getAllMesas = async() =>{
  return await mesasRepo.getAllMesas();
};

const getMesaById = async(id) => {
  return await mesasRepo.getMesaById(id);
};

const createMesa = async(id_cliente, nombre_mesa) => {
  return await mesasRepo.createMesa(id_cliente, nombre_mesa);
};

const toggleMesaStatus = async(id) => {
  return await mesasRepo.toggleMesaStatus(id);
};

const updateMesa = async(id, data) => {
  return await mesasRepo.updateMesa(id, data);
};
module.exports = { getAllMesas, getMesaById, createMesa, toggleMesaStatus, updateMesa };