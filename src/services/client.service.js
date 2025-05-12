const clientRepo = require('../repositories/client.repository');

const listClients = async () => {
  return await clientRepo.getAllClients();
};

const listClient = async(id) => {
  return await clientRepo.getFindById(id)
}

module.exports = { listClients, listClient }