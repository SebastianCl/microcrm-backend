const express = require('express');
const router = express.Router();
const {
  getAllComboProducts,
  getProductByComboId,
  createComboProduct,
  updateComboProduct,
} = require('../controllers/combo_product.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken(['admin', 'empleado']), getAllComboProducts);
router.get('/:id', authenticateToken(['admin', 'empleado']), getProductByComboId);
router.post('/', authenticateToken(['admin', 'empleado']), createComboProduct);
router.patch('/:id', authenticateToken(['admin', 'empleado']), updateComboProduct);


module.exports = router;
