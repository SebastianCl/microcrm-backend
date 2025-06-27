const productService = require('../services/product.service');

const getProducts = async (req, res, next) => {
    try {
        const products = await productService.listProducts();
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};

const getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productService.listProduct(id);
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
};

const getProductAdditions = async(req, res, next) =>{
  try {
    const { id } = req.params;
    const ProductAdditions = await productService.getProductAdditions(id);
    res.status(200).json(ProductAdditions);  
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, stock, maneja_inventario, id_categoria } = req.body;
    const result = await productService.createProduct(
      nombre,
      descripcion,
      precio,
      stock,
      maneja_inventario,
      id_categoria
    );
    res
      .status(201)
      .json({ message: 'Producto creado correctamente', data: result });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await productService.updateProduct(id, data);;
        res.status(200).json({ message: 'Producto actualizado correctamente' });
    } catch (err) {
        next(err);
    }
};

const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productService.updateStatus(id);
    res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (err) {
    next(err);
  }
};

const getCategorias = async (req, res, next) => {
  try {
        const products = await productService.AllCategorias();
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  updateStatus,
  getProductAdditions,
  getCategorias
};
