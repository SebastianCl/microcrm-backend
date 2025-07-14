const userRepo = require('../repositories/user.repository');
const bcrypt = require('bcrypt');

const listUsers = async () => {
  return await userRepo.getAllUsers();
};

const User = async (id) => {
  return await userRepo.getFindById(id);
};

const createNewUser = async (userData) => {
  return await userRepo.createUser(userData);
};

const updateStatus = async(id) => {
  return await userRepo.updateStatus(id);
}; 

const resetPassword = async(id, newPassword) => {
  const hashed = await bcrypt.hash(newPassword, 10);
  return await userRepo.resetPassword({id, newPassword: hashed});
  
};

module.exports = { listUsers, User, createNewUser, updateStatus, resetPassword };
