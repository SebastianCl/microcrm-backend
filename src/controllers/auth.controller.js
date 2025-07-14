const authService = require('../services/auth.service');

const register = async (req, res) => {
  const { id_client, username, password, rol } = req.body;
  const id = await authService.register(id_client,username, password, rol);
  res.status(201).json({ message: 'User created', id });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await authService.login(username, password);
    res.json(response);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

module.exports = { register, login };
