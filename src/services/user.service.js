const userRepo = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const errors = require('../utils/errors');

const listUsers = async () => {
  return await userRepo.getAllUsers();
};

const User = async (id) => {
  return await userRepo.getFindById(id);
};

const createNewUser = async (userData) => {
  const { id_client, username, password, rol} = userData;

  if (!id_client || !username || !password || !rol) throw errors.USER_FAILED_INFO();

  return await userRepo.createUser({ id_client, username, password, rol});
};

const updateStatus = async(id) => {
  return await userRepo.updateStatus(id);
}; 

const resetPassword = async(id, newPassword) => {
  const hashed = await bcrypt.hash(newPassword, 10);
  return await userRepo.resetPassword({id, newPassword: hashed});
  
};

const updateUser = async(id, data) => {
  return await userRepo.updateUser(id, data);
};

module.exports = { listUsers, User, createNewUser, updateStatus, resetPassword, updateUser };
