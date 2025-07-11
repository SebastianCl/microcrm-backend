const categoryService = require('../services/categorias.service');

const getCategories = async (req, res, next) => {
  try {
    const result = await categoryService.listCategories();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await categoryService.listCategory(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { nombre_categoria } = req.body;
    const id = await categoryService.createCategory(nombre_categoria);
    res.status(201).json({ message: 'Categoría creada correctamente', id });
  } catch (err) {
    next(err);
  }
};


const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {nombre_categoria } = req.body;
    await categoryService.updateCategory(id, nombre_categoria);
    res.status(200).json({ message: 'Estado actualizado correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCategories, getCategory, createCategory, updateCategory };
