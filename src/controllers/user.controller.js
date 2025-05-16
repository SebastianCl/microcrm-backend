const userService = require('../services/user.service');

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const User = await userService.User(id);
    res.status(200).json(User);
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers, getUser };
