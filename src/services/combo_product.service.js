const comboProductRepo = require('../repositories/combo_product.repository');

const getAllComboProducts = async () => {
  return await comboProductRepo.getAllComboProducts();
};

const getComboProductById = async (id) => {
  return await comboProductRepo.getComboProductById(id);
};

const getProductByComboId = async (id_combo) => {
  return await comboProductRepo.getProductByComboId(id_combo);
};

const createComboProduct = async (id_combo, id_producto, cantidad) => {
  return await comboProductRepo.createComboProduct(id_combo, id_producto, cantidad);
};

const updateComboProduct = async (id, data) => {
  return await comboProductRepo.updateComboProduct(id, data);
};


module.exports = {
  getAllComboProducts,
  getComboProductById,
  getProductByComboId,
  createComboProduct,
  updateComboProduct,
};
