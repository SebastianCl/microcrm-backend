const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, getUsers);

module.exports = router;
