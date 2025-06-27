const productRepo = require('../repositories/product.repository');

const listProducts = async () => {
  return await productRepo.getAllProducts();
};

const AllCategorias = async () => {
  return await productRepo.AllCategorias();
};

const listProduct = async(id) => {
  return await productRepo.getFindById(id);
};

const getProductAdditions = async(id) =>{
  return await productRepo.getProductAdditions(id);
}; 

const createProduct = async( nombre, descripcion, precio, stock,maneja_inventario, id_categoria ) => {
  return await productRepo.createProduct( nombre, descripcion, precio, stock, maneja_inventario, id_categoria );
};

const updateStatus = async(id) =>{
    return await productRepo.updateStatus(id);
};

const updateProduct = async(id,data) => {
  return await productRepo.updateProduct(id,data);
};

module.exports = { listProducts, listProduct, createProduct, updateStatus, updateProduct, getProductAdditions, AllCategorias };

