const db = require('../config/db');
const errors = require('../utils/errors');
const ApiError = require('../utils/apiError');

const insertarPedido = async ({ id_cliente, id_usuario, id_mesa = null, tipo_pedido = 'en_mesa', id_estado }) => {

  try {
    const { rows } = await db.query(
      `INSERT INTO pedidos (id_cliente, id_usuario, id_mesa, tipo_pedido, id_estado)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id_pedido`,
      [id_cliente, id_usuario, id_mesa, tipo_pedido, id_estado]
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

const actualizarEstadoPedido = async (id_pedido, id_estado) => {
  try {
    await db.query(
      'UPDATE pedidos SET id_estado = $1 WHERE id_pedido = $2',
      [id_estado, id_pedido]
    );
    // 2. Si se finaliza el pedido, buscar la venta generada automáticamente
    const ESTADO_FINALIZADO = 5;

    if (parseInt(id_estado) === ESTADO_FINALIZADO) {

      await new Promise(resolve => setTimeout(resolve, 300)); // 300 ms
      
      const { rows } = await db.query(
        'SELECT id_venta FROM ventas WHERE id_pedido = $1 ORDER BY fecha DESC LIMIT 1',
        [id_pedido]
      );

      if (rows.length === 0) {
        throw new ApiError(500, 'El trigger no generó la venta para el pedido finalizado.');
      }

      return rows[0].id_venta;
    }

    // Si no es finalizado, retornar null o undefined
    return null;
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

const eliminarDetalle = async (client, idDetalle, idPedido) => {
  try {
    const result = await client.query(
      'DELETE FROM detalle_pedido WHERE id_detalle_pedido = $1 AND id_pedido = $2 RETURNING *',
      [idDetalle, idPedido]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, `No se encontró el detalle ${idDetalle} en el pedido ${idPedido}`);
    }
  } catch (error) {
    throw new ApiError(500, 'Error al eliminar el detalle: ' + error.message);
  }
};

const modificarDetalle = async (client, detalle, idPedido) => {
  try {
    const { id_detalle_pedido, ...campos } = detalle;
    const camposActualizables = Object.keys(campos).filter(
      key => ['cantidad', 'precio_unitario', 'descuento'].includes(key) && campos[key] !== undefined
    );

    if (camposActualizables.length === 0) {
      throw new ApiError(400, 'No se enviaron campos para actualizar.');
    }

    const setClause = camposActualizables
      .map((campo, idx) => `${campo} = $${idx + 1}`)
      .join(', ');
    const values = camposActualizables.map(campo => campos[campo]);
    values.push(id_detalle_pedido, idPedido);

    const result = await client.query(
      `UPDATE detalle_pedido 
        SET ${setClause}
        WHERE id_detalle_pedido = $${values.length - 1} AND id_pedido = $${values.length}
        RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, `No se encontró el detalle ${id_detalle_pedido} en el pedido ${idPedido}`);
    }
  } catch (error) {
    throw new ApiError(500, 'Error al modificar el detalle: ' + error.message);
  }
};

const agregarDetalle = async (client, detalle, idPedido) => {
  try {
    const { id_producto, cantidad, precio_unitario, adiciones = [] } = detalle;
    
    const  {rows} = await client.query(
      `INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario)
        VALUES ($1, $2, $3, $4) RETURNING id_detalle_pedido`,
      [idPedido, id_producto, cantidad, precio_unitario]
    );
    let id_detalle_pedido = rows[0].id_detalle_pedido;
    for(const adicion of adiciones){
      insertarDetalleAdicion(id_detalle_pedido, adicion  );
    }
  } catch (error) {
    throw new ApiError(500, 'Error al agregar el detalle: ' + error.message);
  }
};

module.exports = {
  insertarPedido,
  insertarDetallePedido,
  insertarDetalleAdicion,
  obtenerDetallePedido,
  actualizarEstadoPedido,
  getPedidosDelDia,
  eliminarDetalle,
  modificarDetalle,
  agregarDetalle
};