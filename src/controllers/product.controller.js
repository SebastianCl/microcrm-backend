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

const createProduct = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    console.log(nombre, descripcion, precio, stock)
    const result = await productService.createProduct(
      nombre,
      descripcion,
      precio,
      stock
    );
    res
      .status(201)
      .json({ message: 'Producto creado correctamente', data: result });
  } catch (err) {
    next(err)
  }
};

const updateProduct = async (req, res,) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await productService.updateProduct(id, data);;
        res.status(200).json({ message: 'Producto actualizado correctamente' });
    } catch (err) {
        next(err);
    }
};


const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.updateStatus(id);
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};




module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  updateStatus,
};
