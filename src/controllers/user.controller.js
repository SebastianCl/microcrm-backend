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

const toggleStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        await userService.updateStatus(id);
        res.status(200).json({message: 'el estado del usuario ha sido actualizado correctamente'});
    } catch (err) {
        next(err);
    }
};

const resetPassword = async (req, res, next) =>{
  try {
    const { id } = req.params;
    const {newPassword} = req.body;
    await userService.resetPassword(id, newPassword);
    res.status(200).json({message: 'La contraseña se actualizo correctamente'});
  } catch (err) {
    next(err);
  }
};


module.exports = { getUsers, getUser, createUser, toggleStatus, resetPassword };
