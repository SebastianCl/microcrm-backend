const pedidoRepo = require('../repositories/pedido.repository');
const ApiError = require('../utils/apiError');

const crearPedido = async (data) => {
  const { id_cliente, id_usuario, id_mesa, tipo_pedido,productos, id_estado } = data;
  if (!productos || productos.length === 0) {
    throw new ApiError(400, 'Debe incluir al menos un producto en el pedido.');
  }

  const id_pedido = await pedidoRepo.insertarPedido({
    id_cliente, id_usuario, id_mesa, tipo_pedido, id_estado
  });

  for (const producto of productos) {
    const id_detalle = await pedidoRepo.insertarDetallePedido(id_pedido, producto);

    if (producto.adiciones && producto.adiciones.length > 0) {
      for (const adicion of producto.adiciones) {
        await pedidoRepo.insertarDetalleAdicion(id_detalle, adicion);
      }
    }
  }

  return id_pedido;
};

const AddproductoPedido = async (productos, id_pedido) => {
  for (const producto of productos.productos) {
    const id_detalle = await pedidoRepo.insertarDetallePedido(id_pedido, producto);

    if (producto.adiciones && producto.adiciones.length > 0) {
      for (const adicion of producto.adiciones) {
        await pedidoRepo.insertarDetalleAdicion(id_detalle, adicion);
      }
    }
  }

  return id_pedido;
};


const obtenerDetallePedido = async (id_pedido) => {
  return await pedidoRepo.obtenerDetallePedido(id_pedido);
};

const actualizarEstadoPedido = async (id_pedido, estado) => {
  const estadosValidos = ['pendiente', 'procesado', 'cancelado'];
  if (!estadosValidos.includes(estado)) {
    throw new ApiError(400, 'Estado inválido');
  }
  await pedidoRepo.actualizarEstadoPedido(id_pedido, estado);
};

const getPedidosDelDia = async (estado) => {
  return await pedidoRepo.getPedidosDelDia(estado);
};

module.exports = { crearPedido, obtenerDetallePedido, actualizarEstadoPedido,AddproductoPedido,getPedidosDelDia };