const express = require('express');
const router = express.Router();
const {getAllProductAdditions, getProductAdditionById, toggleProductAdditionStatus, createProductAddition, updateAddition } = require('../controllers/product_additions.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken(['admin', 'empleado']), getAllProductAdditions );
router.get('/:id', authenticateToken(['admin', 'empleado']), getProductAdditionById);
router.post('/',  authenticateToken(['admin', 'empleado']), createProductAddition );
router.patch('/:id', authenticateToken(['admin']), toggleProductAdditionStatus);
router.put('/:id', authenticateToken(['admin', 'empleado']), updateAddition);

module.exports = router;