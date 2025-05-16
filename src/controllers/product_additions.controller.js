const productAdditionsService = require('../services/product_additions.service');

const getAllProductAdditions  = async (req, res, next) =>{
  try {
    const productAdditions = await productAdditionsService.listAdditions();
    res.status(200).json(productAdditions);
  } catch (err) {
    next(err);
  }
};

const getProductAdditionById  = async(req, res, next) => {
  try {
    const { id } = req.params;
    const productAddition = await productAdditionsService.listAddition(id);
    res.status(200).json(productAddition);
  } catch (err) {
    next(err);
  }
};

const toggleProductAdditionStatus = async(req, res, next) =>{
  try {
    const { id } = req.params;
    await productAdditionsService.toggleProductAdditionStatus(id);
    res.status(200).json({message: 'El estado cambio correctament'});
  } catch (err) {
    next(err);
  }
};

const createProductAddition = async(req, res, next) =>{
  try {
    const {id_producto, nombre, precio_extra} = req.body;
    const ProductAdditionId = await productAdditionsService.createProductAddition(id_producto, nombre, precio_extra);
    res.status(201).json({ message: 'adicion a producto creada correctamente', ProductAdditionId });
  } catch (err) {
    next(err);
  }
};

const updateAddition = async(req, res, next) =>{
  try {
    const { id } = req.params;
    const data = req.body;
    await productAdditionsService.updateAddition(id, data);
    res.status(200).json({message: 'adicion actualizada correctamente'});
  } catch (err) {
    next(err);
  }
};

module.exports = {getAllProductAdditions, getProductAdditionById, toggleProductAdditionStatus, createProductAddition, updateAddition };