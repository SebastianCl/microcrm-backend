const clientService = require('../services/client.service');

const getClients = async (req, res, next) => {
    try {
        const clients = await clientService.listClients();
        res.status(200).json(clients);
    } catch (err) {
        next(err);
    }
};

const getClient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const client = await clientService.listClient(id);
        res.status(200).json(client);
    } catch (err) {
        next(err);
    }
};

const createClient = async (req, res, next) => {
    try {
        const { nombre, correo, telefono } = req.body;
        const clientId = await clientService.createClient(nombre, correo, telefono);
        res.status(201).json({ message: 'Cliente creado correctamente', clientId });
    } catch (err) {
        next(err);
    }
};

const updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        await clientService.updateStatus(id);
        res.status(200).json({message: 'el estado del cliente ha sido actualizado correctamente'});
    } catch (err) {
        next(err);
    }
};

const updateCliente = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await clientService.updateCliente(id, data);
        res.status(200).json({ message: 'el cliente ha sido actualizado correctamente' });
    } catch (err) {
        next(err);
    }
};

module.exports = {getClients, getClient, createClient, updateStatus, updateCliente};
