const ventasRepo = require('../repositories/ventas.repository');

const getAllVentas = async () => {
    return await ventasRepo.getAllVentas();
};

const getVentaById = async (id) => {
    return await ventasRepo.getVentaById(id);
};

const createVenta = async (id_cliente, id_usuario, fecha, total) => {
    return await ventasRepo.createVenta(id_cliente, id_usuario, fecha, total);
};

module.exports = { getAllVentas, getVentaById, createVenta };
