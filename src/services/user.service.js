const userRepo = require('../repositories/user.repository');

const listUsers = async () => {
  return await userRepo.getAllUsers();
};

const User = async (id) => {
  return await userRepo.getFindById(id);
};

module.exports = { listUsers,User };
