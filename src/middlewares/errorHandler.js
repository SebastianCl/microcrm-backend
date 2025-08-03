const ApiError = require('../utils/apiError');

function errorHandler(err, req, res, next){
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: {
      name: err.name,
      message: err.message,
      statusCode,
      path: req.originalUrl,
      method: req.method
    }
  });
}

function  notFound (req, res, next) {
  next(new ApiError(404, `No se encontró la ruta: ${req.originalUrl}`));
}

module.exports = {errorHandler, notFound};