const express = require('express');
const router = express.Router();
const { getAllPromotions, getPromotionById, createPromotion, togglePromotionStatus, updatePromotions } = require('../controllers/promotions.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken(['admin', 'empleado']),  getAllPromotions);
router.get('/:id', authenticateToken(['admin', 'empleado']), getPromotionById);
router.post('/', authenticateToken(['admin', 'empleado']),  createPromotion);
router.patch('/:id', authenticateToken(['admin']), togglePromotionStatus);
router.put('/:id', authenticateToken(['admin', 'empleado']), updatePromotions);

module.exports = router;