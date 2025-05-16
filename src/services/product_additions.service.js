const productAdditionsRepo = require('../repositories/product_additions.repository');

const listAdditions = async() =>{
  return await productAdditionsRepo.getAllProductAdditions();
};

const listAddition = async(id) => {
  return await productAdditionsRepo.getProductAdditionById(id);
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

module.exports = { listAdditions, listAddition, toggleProductAdditionStatus, createProductAddition, updateAddition };