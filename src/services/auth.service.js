const userRepo = require('../repositories/user.repository');
const userService = require('../services/user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (id_client,username, password, rol) => {
  const hashed = await bcrypt.hash(password, 10);
  const userData = { id_client, username, password: hashed, rol };
  const userId = await userService.createNewUser(userData);
  return userId;
};

const login = async (username, password) => {
  const user = await userRepo.findByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.contrasena))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user.id, username: user.username, role: user.rol }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  const userResponse = {
    id_usuario: user.id_usuario,
    rol: user.rol,
    token
  };
  return userResponse;
};

module.exports = { register, login };
