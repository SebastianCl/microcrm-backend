const express = require('express');
const router = express.Router();
const { getCategories, getCategory, createCategory, updateCategory } = require('../controllers/categorias.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken(['admin', 'empleado']), getCategories);
router.get('/:id',authenticateToken(['admin', 'empleado']), getCategory);
router.post('/', authenticateToken(['admin']), createCategory);
router.put('/:id', authenticateToken(['admin']),  updateCategory);
module.exports = router;
 