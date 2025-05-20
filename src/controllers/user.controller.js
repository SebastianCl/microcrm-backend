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

const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const userId = await userService.createNewUser(userData);
    res.status(201).json({ id: userId, message: 'Usuario creado exitosamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers, getUser, createUser };
