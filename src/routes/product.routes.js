const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, updateStatus, getProductAdditions, getCategorias} = require('../controllers/product.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken(['admin', 'empleado']), getProducts);
router.get('/categorias', authenticateToken(['admin', 'empleado']), getCategorias);
router.get('/:id', authenticateToken(['admin', 'empleado']), getProduct);
router.get('/:id/additions',authenticateToken(['admin', 'empleado']), getProductAdditions  );
router.post('/', authenticateToken(['admin', 'empleado']), createProduct);
router.patch('/:id', authenticateToken(['admin',"empleado"]), updateStatus);
router.put('/:id', authenticateToken(['admin', 'empleado']), updateProduct);

module.exports = router;
