const db = require('../config/db');

const insertarPedido = async ({ id_cliente, id_usuario, id_mesa = null, tipo_pedido = 'en_mesa' }) => {
  const result = await db.query(
    `INSERT INTO pedidos (id_cliente, id_usuario, id_mesa, tipo_pedido)
     VALUES ($1, $2, $3, $4)
     RETURNING id_pedido`,
    [id_cliente, id_usuario, id_mesa, tipo_pedido]
  );
  return result.rows[0].id_pedido;
};

const insertarDetallePedido = async (id_pedido, { id_producto, cantidad, precio_unitario }) => {
  const result = await db.query(
    `INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario)
     VALUES ($1, $2, $3, $4)
     RETURNING id_detalle_pedido`,
    [id_pedido, id_producto, cantidad, precio_unitario]
  );
  return result.rows[0].id_detalle_pedido;
};

const insertarDetalleAdicion = async (id_detalle_pedido, { id_adicion, cantidad }) => {
  await db.query(
    `INSERT INTO detalle_pedido_adiciones (id_detalle_pedido, id_adicion, cantidad)
     VALUES ($1, $2, $3)`,
    [id_detalle_pedido, id_adicion, cantidad]
  );
};

const obtenerDetallePedido = async (id_pedido) => {
  const result = await db.query('SELECT * FROM get_detalle_pedido_completo($1)', [id_pedido]);
  return result.rows;
};

const actualizarEstadoPedido = async (id_pedido, estado) => {
  await db.query(`UPDATE pedidos SET estado = $1::estado_pedido WHERE id_pedido = $2`,[estado, id_pedido]);
};

module.exports = {
  insertarPedido,
  insertarDetallePedido,
  insertarDetalleAdicion,
  obtenerDetallePedido,
  actualizarEstadoPedido
};