const clientService = require('../services/client.service');

const getClients = async (req, res) => {
    try {
        const clients = await clientService.listClients();
        res.status(200).json(clients);
    } catch (error) {
        console.error('Error al obtener los clientes: ', error);
        res.status(500).json({
            message: 'Error al obtener los clientes',
        });
    }
};

const getClient = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await clientService.listClient(id);
        res.status(200).json(client);    
    } catch (error) {
        console.error('Error al obtener el clien: ', error);
        res.status(500).json({
            message: 'Error al obtener el cliente'
        });
    }
};

const createClient = async (req, res) => {
    try {
        const { nombre, correo, telefono } = req.body;
        const response = await clientService.createClient(nombre, correo, telefono);
        res.status(201).json({message: `cliente creado correctamente: ${response}`});
    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).json({message: 'Error al crear el cliente'});
    }
};

const deleteClient = async(req, res) => {
    try {
        const { id } = req.params;
        await clientService.deleteClient(id);
        res.status(200).json({message: 'Cliente eliminado correctamente'});
    } catch (error) {
        console.error('Error al eliminar el cliente: ', error);
        res.status(500).json('Error al eliminar el cliente');
    }    
};


module.exports = { getClients, getClient, createClient, deleteClient };
