const db = require('../config/db');
const errors = require('../utils/errors');
const ApiError = require('../utils/apiError');

const insertarPedido = async ({ id_cliente, id_usuario, id_mesa = null, tipo_pedido = 'en_mesa' }) => {
  try {
    const { rows } = await db.query(
      `INSERT INTO pedidos (id_cliente, id_usuario, id_mesa, tipo_pedido)
        VALUES ($1, $2, $3, $4)
        RETURNING id_pedido`,
      [id_cliente, id_usuario, id_mesa, tipo_pedido]
    );
    return rows[0].id_pedido;
  } catch (error) {
    throw errors.PEDIDO_CREATION_FAILED();
  }
};

const insertarDetallePedido = async (id_pedido, { id_producto, cantidad, precio_unitario }) => {
  try {
    const { rows } = await db.query(
      `INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario)
      VALUES ($1, $2, $3, $4)
      RETURNING id_detalle_pedido`,
      [id_pedido, id_producto, cantidad, precio_unitario]
    );
    return rows[0].id_detalle_pedido;
  } catch (error) {
    throw errors.PEDIDO_DETALLE_CREATION_FAILED();
  }
};

const insertarDetalleAdicion = async (id_detalle_pedido, { id_adicion, cantidad }) => {
  try {
    await db.query(
      `INSERT INTO detalle_pedido_adiciones (id_detalle_pedido, id_adicion, cantidad)
       VALUES ($1, $2, $3)`,
      [id_detalle_pedido, id_adicion, cantidad]
    );
  } catch (error) {
    throw errors.PEDIDO_ADICION_CREATION_FAILED();
  }
};

const obtenerDetallePedido = async (id_pedido) => {
  try {
    const result = await db.query('SELECT * FROM get_detalle_pedido_completo($1)', [id_pedido]);
    if (result.rows.length === 0) throw errors.PEDIDO_DETALLE_NOT_FOUND();
    return result.rows;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw errors.PEDIDO_DETALLE_NOT_FOUND();
  }
};

const actualizarEstadoPedido = async (id_pedido, estado) => {
  try {
    await db.query(
      'UPDATE pedidos SET estado = $1::estado_pedido WHERE id_pedido = $2',
      [estado, id_pedido]
    );
  } catch (error) {
    throw errors.PEDIDO_STATUS_UPDATE_FAILED();
  }
};

const getPedidosDelDia = async (estado) => {
  const query = estado
    ? 'SELECT * FROM get_pedidos_del_dia($1)'
    : 'SELECT * FROM get_pedidos_del_dia()';
  const values = estado ? [estado] : [];
  const result = await db.query(query, values);
  return result.rows;
};

module.exports = {
  insertarPedido,
  insertarDetallePedido,
  insertarDetalleAdicion,
  obtenerDetallePedido,
  actualizarEstadoPedido,
  getPedidosDelDia
};