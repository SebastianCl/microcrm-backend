const pedidoRepo = require('../repositories/pedido.repository');
const ApiError = require('../utils/apiError');
const db = require('../config/db');

const crearPedido = async (data) => {
  let { id_cliente, id_usuario, id_mesa, tipo_pedido,medio_pago,Observacion,productos, id_estado, valor_domi, valor_descu  } = data;
  if(!id_cliente) id_cliente = 1;
  if (!productos || productos.length === 0) {
    throw new ApiError(400, 'Debe incluir al menos un producto en el pedido.');
  }

  const id_pedido = await pedidoRepo.insertarPedido({
    id_cliente, id_usuario, id_mesa, tipo_pedido, id_estado, medio_pago, Observacion, valor_domi, valor_descu
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

const actualizarEstadoPedido = async (id_pedido, id_estado, medio_pago) => {
  return await pedidoRepo.actualizarEstadoPedido(id_pedido, id_estado, medio_pago);
};

const getPedidosDelDia = async (estado) => {
  return await pedidoRepo.getPedidosDelDia(estado);
};

const ajustarPedido = async (id, valor_domi, valor_descu, agregados, modificados, eliminados) => {
  const client = await db.connect();
  
  try {

    if(valor_domi != null) {
      await pedidoRepo.actualizarValorDomi(id, valor_domi);
    }
    if(valor_descu != null) {
      await pedidoRepo.actualizarValorDescu(id, valor_descu);
    }
    if (!Array.isArray(agregados) || !Array.isArray(modificados) || !Array.isArray(eliminados)) {
      throw new ApiError(400, 'Los campos agregados, modificados y eliminados deben ser arrays');
    }

    /* Inicia la transacción de la base de datos para que se realicen todas las operaciones en una sola transacción */
    await client.query('BEGIN');

    for (const idDetalle of eliminados) {
      await pedidoRepo.eliminarDetalle(client, idDetalle, id);
    }


    for (const detalle of modificados) {
      await pedidoRepo.modificarDetalle(client, detalle, id);
    }


    for (const detalle of agregados) {
    await pedidoRepo.agregarDetalle(client, detalle, id);    
    }
    /* Se confirma la transacción si todas las operaciones se realizan correctamente */
    await client.query('COMMIT');
  } catch (error) {
    /* Se revierte la transacción si ocurre un error en alguna de las operaciones */
    await client.query('ROLLBACK');
    throw new ApiError(500, 'Error al ajustar el pedido: ' + error.message);
  } finally {
    client.release();
  }
};

module.exports = { crearPedido, obtenerDetallePedido, actualizarEstadoPedido,AddproductoPedido,getPedidosDelDia, ajustarPedido };