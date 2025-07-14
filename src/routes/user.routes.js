const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser, toggleStatus, resetPassword } = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/auth.middleware');



router.get('/', authenticateToken(['admin']), getUsers);
router.get('/:id', authenticateToken(['admin', 'empleado']), getUser);
router.post('/', createUser);
router.patch('/:id', authenticateToken(['admin']), toggleStatus);
router.patch('/reset-password/:id', authenticateToken(['admin', 'empleado']), resetPassword);
module.exports = router;
