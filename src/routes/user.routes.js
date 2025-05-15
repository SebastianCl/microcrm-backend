const express = require('express');
const router = express.Router();
const { getUsers, getUser } = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/auth.middleware');



router.get('/', authenticateToken(['admin']), getUsers);
router.get('/:id', authenticateToken(['admin', 'empleado']), getUser);

module.exports = router;
