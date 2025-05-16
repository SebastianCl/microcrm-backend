const express = require('express');
const router = express.Router();
const {getAllProductAdditions, getProductAdditionById, toggleProductAdditionStatus, createProductAddition } = require('../controllers/productAdditions.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken(['admin', 'empleado']), getAllProductAdditions );
router.get('/:id', authenticateToken(['admin', 'empleado']), getProductAdditionById);
router.post('/',  authenticateToken(['admin', 'empleado']), createProductAddition );
router.patch('/:id', authenticateToken(['admin']), toggleProductAdditionStatus);

module.exports = router;