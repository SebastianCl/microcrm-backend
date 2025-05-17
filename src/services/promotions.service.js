const promotionsRepo = require('../repositories/promotions.repository');

const getAllPromotions = async() =>{
  return await promotionsRepo.getAllPromotions();
};

const getPromotionById = async(id) =>{
  return await promotionsRepo.getPromotionById(id);
}; 

const createPromotion = async(nombre, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin) => {
  return await promotionsRepo.createPromotion(nombre, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin);
};

const togglePromotionStatus = async (id) => {
  return await promotionsRepo.togglePromotionStatus(id);
};

const updatePromotions = async (id, data) => {
  return await promotionsRepo.updatePromotions(id, data);
};

module.exports = { getAllPromotions, getPromotionById, createPromotion, togglePromotionStatus, updatePromotions };