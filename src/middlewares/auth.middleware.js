const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(requiredRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) return res.sendStatus(401); // No autorizado

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Token inválido

      if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Acceso restringido para tu rol' });
      }

      req.user = user;
      next();
    });
  };
}

module.exports = authenticateToken;
