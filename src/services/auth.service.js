const userRepo = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (username, password) => {
  const hashed = await bcrypt.hash(password, 10);
  const userId = await userRepo.createUser({ username, password: hashed });
  return userId;
};

const login = async (username, password) => {
  const user = await userRepo.findByUsername(username);
  // if (!user || !(await bcrypt.compare(password, user.password))) {
  if (!user || !(password == user.contrasena)) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
  return token;
};

module.exports = { register, login };
