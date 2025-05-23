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

  // Errores para promociones
  PROMOTIONS_NOT_FOUND: () => new ApiError(404, 'Promociones no encontradas'),
  PROMOTION_NOT_FOUND: () => new ApiError(404, 'Promoción no encontrada'),
  PROMOTION_ALREADY_EXISTS: () => new ApiError(409, 'La promoción ya existe'),
  PROMOTION_CREATION_FAILED: () => new ApiError(500, 'Error al crear la promoción'),
  PROMOTION_UPDATE_FAILED: () => new ApiError(500, 'Error al actualizar la promoción'),

   // Errores para mesas
  MESAS_NOT_FOUND: () => new ApiError(404, 'Mesas no encontradas'),
  MESA_NOT_FOUND: () => new ApiError(404, 'Mesa no encontrada'),
  MESA_ALREADY_EXISTS: () => new ApiError(409, 'La mesa ya existe'),
  MESA_CREATION_FAILED: () => new ApiError(500, 'Error al crear la mesa'),
  MESA_UPDATE_FAILED: () => new ApiError(500, 'Error al actualizar la mesa'),

   // Errores para combos
  COMBOS_NOT_FOUND: () => new ApiError(404, 'Combos no encontrados'),
  COMBO_NOT_FOUND: () => new ApiError(404, 'Combo no encontrado'),
  COMBO_ALREADY_EXISTS: () => new ApiError(409, 'El combo ya existe'),
  COMBO_CREATION_FAILED: () => new ApiError(500, 'Error al crear el combo'),
  COMBO_UPDATE_FAILED: () => new ApiError(500, 'Error al actualizar el combo'),

   // Errores para combos_Producto
  COMBO_PRODUCTS_NOT_FOUND: () => new ApiError(404, 'Combo_producto no encontrados'),
  COMBO_PRODUCT_NOT_FOUND: () => new ApiError(404, 'Combo_producto no encontrado'),
  COMBO_ALREADY_EXISTS: () => new ApiError(409, 'El combo ya existe'),
  COMBO_PRODUCT_CREATION_FAILED: () => new ApiError(500, 'Error al crear el combo'),
  COMBO_PRODUCT_UPDATE_FAILED: () => new ApiError(500, 'Error al actualizar el combo'),

  // Errores para gastos
  EXPENSES_NOT_FOUND: () => new ApiError(404, 'Gastos no encontrados'),
  EXPENSE_NOT_FOUND: () => new ApiError(404, 'Gasto no encontrado'),
  EXPENSE_ALREADY_EXISTS: () => new ApiError(409, 'El gasto ya existe'),
  EXPENSE_CREATION_FAILED: () => new ApiError(500, 'Error al crear el gasto'),

  // Errores para pedidos
  PEDIDOS_NOT_FOUND: () => new ApiError(404, 'No se encontró el pedido'),
  PEDIDO_CREATION_FAILED: () => new ApiError(500, 'Error al crear el pedido'),
  PEDIDO_DETALLE_CREATION_FAILED: () => new ApiError(500, 'Error al crear el detalle del pedido'),
  PEDIDO_ADICION_CREATION_FAILED: () => new ApiError(500, 'Error al agregar adiciones al pedido'),
  PEDIDO_DETALLE_NOT_FOUND: () => new ApiError(404, 'No se encontró el detalle del pedido'),
  PEDIDO_STATUS_UPDATE_FAILED: () => new ApiError(500, 'Error al actualizar el estado del pedido'),

  // Errores para ventas
  VENTAS_NOT_FOUND: () => new ApiError(404, 'Ventas no encontradas'),
  VENTA_NOT_FOUND: () => new ApiError(404, 'Venta no encontrada'),
  VENTA_ALREADY_EXISTS: () => new ApiError(409, 'La venta ya existe'),
  VENTA_CREATION_FAILED: () => new ApiError(500, 'Error al crear la venta'),
  VENTA_UPDATE_FAILED: () => new ApiError(500, 'Error al actualizar la venta'),

  // Errores para detalles de venta
  DETALLES_VENTAS_CREATION_FAILED: () => new ApiError(500, 'Error al crear la venta'),
  DETALLES_VETA_NOT_FOUND: () => new ApiError(404, 'detalles de venta no encontrados'),

  // Errores para inventario
  INVENTARIOS_NOT_FOUND: () => new ApiError(404, 'Movimientos de inventario no encontrados'),
  INVENTARIO_NOT_FOUND: () => new ApiError(404, 'Movimiento de inventario no encontrados'),
  INVENTARIO_CREATION_FAILED: () => new ApiError(500, 'Error al crear el movimiento de inventario'),
  STOCK_INSUFICIENTE: () => new ApiError(400, 'Stock insuficiente para esta salida')

};

module.exports = errors;