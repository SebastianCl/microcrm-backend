const finanaceService = require('../services/finance.service');

const summary = async(req, res, next) => {
  try {
    const {fecha_inicio, fecha_final} = req.query;

    const resumenFinanciero = await finanaceService.summary(fecha_inicio, fecha_final);
    res.status(200).json(resumenFinanciero);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  summary
};