const categoryRepo = require('../repositories/categorias.repository');

const listCategories = async () => await categoryRepo.getAll();
const listCategory = async (id) => await categoryRepo.getById(id);
const createCategory = async (nombre_categoria) => await categoryRepo.create(nombre_categoria);
const updateCategory = async (id, nombre_categoria) => await categoryRepo.updateCategory(id, nombre_categoria);

module.exports = { listCategories, listCategory, createCategory,  updateCategory };
