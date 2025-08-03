const clientRepo = require('../repositories/client.repository');

const listClients = async () => {
  return await clientRepo.getAllClients();
};

const listClient = async(id) => {
  return await clientRepo.getFindById(id);
};

const createClient = async(name, email, phone) => {
  return await clientRepo.createClient(name, email, phone);
};

const updateStatus = async(id) =>{
    return await clientRepo.updateStatus(id);
};

const updateCliente = async(id,data) => {
  return await clientRepo.updateCliente(id,data);
};

module.exports = { listClients, listClient, createClient, updateStatus, updateCliente };