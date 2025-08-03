const productAdditionsService = require('../services/product_additions.service');

const getAdditions  = async (req, res, next) =>{
  try {
    const productAdditions = await productAdditionsService.getAdditions();
    res.status(200).json(productAdditions);
  } catch (err) {
    next(err);
  }
};

const getAdditionById  = async(req, res, next) => {
  try {
    const { id } = req.params;
    const productAddition = await productAdditionsService.getAdditionById(id);
    res.status(200).json(productAddition);
  } catch (err) {
    next(err);
  }
};

const createProductAddition = async(req, res, next) =>{
  try {
    const {id_producto, nombre, precio_extra} = req.body;
    const ProductAdditionId = await productAdditionsService.createProductAddition(id_producto, nombre, precio_extra);
    res.status(201).json({ message: 'adicion creada correctamente', ProductAdditionId });
  } catch (err) {
    next(err);
  }
};

const toggleProductAdditionStatus = async(req, res, next) =>{
  try {
    const { id } = req.params;
    await productAdditionsService.toggleProductAdditionStatus(id);
    res.status(200).json({message: 'El estado cambio correctamente'});
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

module.exports = {getAdditions, getAdditionById, toggleProductAdditionStatus, createProductAddition, updateAddition };