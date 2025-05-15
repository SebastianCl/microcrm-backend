const productRepo = require('../repositories/product.repository');

const listProducts = async () => {
  return await productRepo.getAllProducts();
};

const listProduct = async(id) => {
  return await productRepo.getFindById(id);
};

const createProduct = async( nombre, descripcion, precio, stock ) => {
  return await productRepo.createProduct( nombre, descripcion, precio, stock );
};

const updateStatus = async(id) =>{
    return await productRepo.updateStatus(id);
};

const updateProduct = async(id,data) => {
  return await productRepo.updateProduct(id,data);
};

module.exports = { listProducts, listProduct, createProduct, updateStatus, updateProduct };

