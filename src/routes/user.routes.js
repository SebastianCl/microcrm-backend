const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser } = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/auth.middleware');



router.get('/', authenticateToken(['admin']), getUsers);
router.get('/:id', authenticateToken(['admin', 'empleado']), getUser);
router.post('/', createUser);

module.exports = router;
