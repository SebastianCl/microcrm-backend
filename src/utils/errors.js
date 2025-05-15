const ApiError = require('./apiError');

const errors = {
  // validaciones genericas
  UNAUTHORIZED: () => new ApiError(401, 'No autorizado'),
  VALIDATION_FAILED: (msg) => new ApiError(400, msg),
  FORBIDDEN: () => new ApiError(403, 'Acceso prohibido: token no enviado o inválido'),

  // Errores  para clientes
  CLIENTS_NOT_FOUND: () => new ApiError(404, 'Clientes no encontrados'),
  CLIENT_NOT_FOUND: () => new ApiError(404, 'Cliente no encontrado'),
  CLIENT_ALREADY_EXISTS: () => new ApiError(409, 'El cliente ya existe'),
  CLIENT_CREATION_FAILED: () => new ApiError(500, 'Error al crear el cliente'),
  CLIENT_UPDATE_FAILED: () => new ApiError(500, 'Error al actualizar el cliente'),

  // Errores  para productos
  PRODUCTS_NOT_FOUND: () => new ApiError(404, 'Productos no encontrados'),
  PRODUCT_NOT_FOUND: () => new ApiError(404, 'Producto no encontrado'),
  PRODUCT_ALREADY_EXISTS: () => new ApiError(409, 'El producto ya existe'),
  PRODUCT_CREATION_FAILED: () => new ApiError(500, 'Error al crear el producto'),
  PRODUCT_UPDATE_FAILED: () => new ApiError(500, 'Error al actualizar el producto'),

  // Errores para usuarios
  USERS_NOT_FOUND: () => new ApiError(404, 'Fallo al consultar usuario'),
  USER_NOT_FOUND: () => new ApiError(404, 'Usuario no encontrado'),
  USER_ALREADY_EXISTS: () => new ApiError(409, 'El Usuario ya existe'),
  USER_CREATION_FAILED: () => new ApiError(500, 'Error al crear el Usuario'),
  USER_UPDATE_FAILED: () => new ApiError(500, 'Error al actualizar el Usuario'),

  // Errores para adiciones de producto
  ADDITIONS_NOT_FOUND: () => new ApiError(404, 'Fallo al consultar adiciones'),
  ADDITION_NOT_FOUND: () => new ApiError(404, 'Adición no encontrada'),
  ADDITION_ALREADY_EXISTS: () => new ApiError(409, 'La adición ya existe'),
  ADDITION_CREATION_FAILED: () => new ApiError(500, 'Error al crear la adición'),
  ADDITION_UPDATE_FAILED: () => new ApiError(500, 'Error al actualizar la adición'),

};

module.exports = errors;