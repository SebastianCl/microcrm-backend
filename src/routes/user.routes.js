const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/auth.middleware');


// tAlls Role
router.get('/', authenticateToken(['admin']), getUsers);

module.exports = router;
