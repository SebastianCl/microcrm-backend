const jwt = require('jsonwebtoken');
require('dotenv').config();
const errors = require('../utils/errors');

function authenticateToken(requiredRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token)  throw errors.FORBIDDEN(); // No autorizado

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) throw errors.FORBIDDEN(); // Token inválido

      if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        throw errors.UNAUTHORIZED();
      }

      req.user = user;
      next();
    });
  };
}

module.exports = authenticateToken;
