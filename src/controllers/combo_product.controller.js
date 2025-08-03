const comboProductService = require('../services/combo_product.service');

const getAllComboProducts = async (req, res, next) => {
  try {
    const comboProducts = await comboProductService.getAllComboProducts();
    res.status(200).json(comboProducts);
  } catch (err) {
    next(err);
  }
};

const getProductByComboId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productos = await comboProductService.getProductByComboId(id);
    res.status(200).json(productos);
  } catch (err) {
    next(err);
  }
};

const createComboProduct = async (req, res, next) => {
  try {
    const { id_combo, id_producto, cantidad } = req.body;
    const comboProductId = await comboProductService.createComboProduct(id_combo, id_producto, cantidad);
    res.status(201).json({ message: 'Combo-producto creado correctamente', comboProductId });
  } catch (err) {
    next(err);
  }
};

const updateComboProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await comboProductService.updateComboProduct(id, data);
    res.status(200).json({ message: 'Combo-producto actualizado correctamente' });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getAllComboProducts,
  getProductByComboId,
  createComboProduct,
  updateComboProduct,
};
