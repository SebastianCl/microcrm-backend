const promotionsService = require('../services/promotions.service');

const getAllPromotions = async(req, res, next) =>{
  try {
    const promotions = await promotionsService.getAllPromotions();
    res.status(200).json(promotions);
  } catch (err) {
    next(err);
  }
};

const getPromotionById = async(req, res, next) =>{
  try {
    const { id } = req.params;
    const promotion = await promotionsService.getPromotionById(id);
    res.status(200).json(promotion);
  } catch (err) {
    next(err);
  }
};

const createPromotion = async(req, res, next) =>{
  try {
    const {nombre, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin} = req.body;
    const promotionId = await promotionsService.createPromotion(nombre, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin);
    res.status(200).json({message: 'promocion creada correctamente', promotionId});
  } catch (err) {
    next(err);
  }
};

const togglePromotionStatus = async(req, res, next) =>{
  try {
    const { id } = req.params;
    await promotionsService.togglePromotionStatus(id);
    res.status(200).json({message: 'el estado cambio correctamente'});
  } catch (err) {
    next(err);
  }
};

const updatePromotions = async(req, res, next) =>{
  try {
    const { id } = req.params;
    const data = req.body;
    await promotionsService.updatePromotions(id, data);
    res.status(200).json({message: 'La promocion se actualizo correctamente'});
  } catch (err) {
    next(err);
  }
};
module.exports = { getAllPromotions, getPromotionById, createPromotion, togglePromotionStatus, updatePromotions };