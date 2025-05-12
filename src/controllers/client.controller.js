const clientService = require('../services/client.service');

const getClients = async(req, res) => {
    const clients = await clientService.listClients();
    res.status(200).json(clients);
};

const getClient = async(req, res) => {
    const { id } = req.params;
    const client = await clientService.listClient(id);
    res.status(200).json(client);
}

module.exports = { getClients, getClient };

