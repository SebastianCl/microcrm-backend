const mesasService = require('../services/mesas.service');

const getAllMesas = async(req, res, next) => {
  try {
    const mesas = await mesasService.getAllMesas();
    res.status(200).json(mesas);
  } catch (err) {
    next(err);
  }
};

const getMesaById = async(req, res, next) =>{
  try {
    const { id } = req.params;
    const mesa = await mesasService.getMesaById(id);
    res.status(200).json(mesa); 
  } catch (err) {
    next(err);
  }
};

const getMesaByClientId = async(req, res, next) => {
  try {
    const { id } = req.params;
    const mesas = await mesasService.getMesaByClientId(id);
    res.status(200).json(mesas);
  } catch (err) {
    next(err);
  }
};

const createMesa = async(req, res, next) => {
  try {
    const {id_cliente, nombre_mesa} = req.body;
    const idMesa = await mesasService.createMesa(id_cliente, nombre_mesa);
    res.status(200).json({message: 'mesa creada correctamente', idMesa});
  } catch (err) {
    next(err);
  }
};

const toggleMesaStatus = async(req, res, next) => {
  try {
    const { id } = req.params;
    await mesasService.toggleMesaStatus(id);
    res.status(200).json({message: 'El estado cambio correctamente'});
  } catch (err) {
    next(err);
  }
};

const updateMesa = async(req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await mesasService.updateMesa(id, data);
    res.status(200).json({message : 'La mesa se actualizo correctamente'});
  } catch (err) {
    next(err);
  }
};
module.exports = { getAllMesas, getMesaById, getMesaByClientId,  createMesa, toggleMesaStatus, updateMesa };