const userRepo = require('../repositories/user.repository');

const listUsers = async () => {
  return await userRepo.getAllUsers();
};

module.exports = { listUsers };
