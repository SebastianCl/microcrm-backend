const userRepo = require('../repositories/user.repository');

const listUsers = async () => {
  return await userRepo.getAllUsers();
};

const User = async (id) => {
  return await userRepo.getFindById(id);
};

const createNewUser = async (userData) => {
  return await userRepo.createUser(userData);
};

module.exports = { listUsers, User, createNewUser };
