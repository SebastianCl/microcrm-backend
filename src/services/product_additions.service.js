const productAdditionsRepo = require('../repositories/product_additions.repository');

const getAdditions = async() =>{
  return await productAdditionsRepo.getAdditions();
};

const getAdditionById = async(id) => {
  return await productAdditionsRepo.getAdditionById(id);
};

const toggleProductAdditionStatus = async(id) => {
  return await productAdditionsRepo.toggleProductAdditionStatus(id);
};

const createProductAddition = async(idproducto, nombre, precioExtra) => {
  return await productAdditionsRepo.createProductAddition(idproducto, nombre, precioExtra);
};

const updateAddition = async(id, data) =>{
  return await productAdditionsRepo.updateAddition(id, data);
};

module.exports = { getAdditions, getAdditionById, toggleProductAdditionStatus, createProductAddition, updateAddition };