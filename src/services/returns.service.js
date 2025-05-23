const returnsRepo = require('../repositories/returns.repository');

const getAllReturns = async () => {
    return await returnsRepo.getAllReturns();
};

const getReturnById = async (id) => {
    return await returnsRepo.getReturnById(id);
};

const createReturn = async (id_venta, id_producto, cantidad, motivo, fecha) => {
    return await returnsRepo.createReturn(id_venta, id_producto, cantidad, motivo, fecha);
};

module.exports = { getAllReturns, getReturnById, createReturn }; 