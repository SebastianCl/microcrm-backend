const combosService = require('../services/combos.service');

// Obtener todos los combos
const getCombos = async (req, res, next) => {
  try {
    const combos = await combosService.listCombos();
    res.status(200).json(combos);
  } catch (err) {
    next(err);
  }
};

// Obtener un combo por ID
const getComboById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const combo = await combosService.getComboById(id);
    res.status(200).json(combo);
  } catch (err) {
    next(err);
  }
};

// Obtener productos que pertenecen a un combo
const getComboItems = async (req, res, next) => {
  try {
    const { id } = req.params;
    const items = await combosService.getComboItems(id);
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

// Crear un nuevo combo
const createCombo = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio_combo, productos } = req.body;
    const result = await combosService.createCombo(nombre, descripcion, precio_combo, productos);
    res.status(201).json({ message: 'Combo creado correctamente', data: result });
  } catch (err) {
    next(err);
  }
};

// Actualizar un combo
const updateCombo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await combosService.updateCombo(id, data);
    res.status(200).json({ message: 'Combo actualizado correctamente' });
  } catch (err) {
    next(err);
  }
};

// Cambiar el estado (activo/inactivo)
const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    await combosService.updateStatus(id);
    res.status(200).json({ message: 'Estado del combo actualizado correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCombos,
  getComboById,
  createCombo,
  updateCombo,
  updateStatus,
  getComboItems,
};
