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

const deleteClient = async(id) =>{
    return await clientRepo.deleteClient(id);
};

module.exports = { listClients, listClient, createClient, deleteClient };