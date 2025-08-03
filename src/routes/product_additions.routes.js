const express = require('express');
const router = express.Router();
const {getAdditions, getAdditionById, toggleProductAdditionStatus, createProductAddition, updateAddition } = require('../controllers/product_additions.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken(['admin', 'empleado']),  getAdditions );
router.get('/:id', authenticateToken(['admin', 'empleado']),  getAdditionById);
router.post('/', authenticateToken(['admin', 'empleado']), createProductAddition );
router.patch('/:id', authenticateToken(['admin', 'empleado']), toggleProductAdditionStatus);
router.put('/:id', authenticateToken(['admin', 'empleado']), updateAddition);


module.exports = router;