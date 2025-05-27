const configService = require('../services/configuration.service');

const getConfigurations = async (req, res, next) => {
  try {
    const configs = await configService.getAllConfigurations();
    res.json(configs);
  } catch (err) {
    next(err);
  }
};

const getByClientId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const config = await configService.getByClientId(id);
    res.json(config);
  } catch (err) {
    next(err);
  }
};

const updateModuleStatus = async (req, res, next) => {
  try {
    const { id_cliente, modulo, activo } = req.body;
    await configService.updateModuleStatus(id_cliente, modulo, activo);
    res.json({ success: true, message: 'Estado del módulo actualizado' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getConfigurations,
  getByClientId,
  updateModuleStatus
};
