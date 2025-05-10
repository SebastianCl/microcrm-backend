const userService = require('../services/user.service');

const getUsers = async (req, res) => {
  const users = await userService.listUsers();
  res.json(users);
};

module.exports = { getUsers };
