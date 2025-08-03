const inventarioRepo = require('../repositories/inventario.repository');
const errors = require('../utils/errors');

const getAllRecords = async () => {
    const records = await inventarioRepo.getAllRecords();
    return records;
};

const getInventoryByProductId = async (id) => {
  return await inventarioRepo.getInventoryByProductId(id);
};

const createInventoryMovement = async (data) => {
    const result = await inventarioRepo.createInventoryMovement(data);
    if (!result) {
        throw errors.INVENTARIO_CREATION_FAILED();
    }
    return result;
};

module.exports = {
    getAllRecords,
    getInventoryByProductId,
    createInventoryMovement
};
