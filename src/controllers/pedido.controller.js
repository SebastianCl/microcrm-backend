const pedidoService = require('../services/pedido.service');

const crearPedido = async (req, res, next) => {
  try {
    const pedidoId = await pedidoService.crearPedido(req.body);
    res.status(201).json({ success: true, id_pedido: pedidoId });
  } catch (error) {
    next(error);
  }
};

const AddproductoPedido = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pedidoId = await pedidoService.AddproductoPedido(req.body,id);
    res.status(201).json({ success: true, id_pedido: pedidoId });
  } catch (error) {
    next(error);
  }
};

const obtenerDetallePedido = async (req, res, next) => {
  try {
    const { id } = req.params;
    const detalle = await pedidoService.obtenerDetallePedido(Number(id));
    res.json({ success: true, data: detalle });
  } catch (error) {
    next(error);
  }
};

const actualizarEstadoPedido = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id_estado, medio_pago, valor_domi, valor_descu } = req.body;
    const idVenta = await pedidoService.actualizarEstadoPedido(Number(id), Number(id_estado), medio_pago, Number(valor_domi), Number(valor_descu));
    res.json({ success: true, message: 'Estado actualizado', id_venta: idVenta || null });
  } catch (error) {
    next(error);
  }
};

const getPedidosDelDia = async (req, res, next) => {
  try {
    const { estado } = req.query;
    const pedidos = await pedidoService.getPedidosDelDia(estado);
    res.json({ success: true, data: pedidos });
  } catch (error) {
    next(error);
  }
};

const ajustarPedido = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {  valor_domi, valor_descu, agregados, modificados, eliminados } = req.body;
    await pedidoService.ajustarPedido(id, valor_domi, valor_descu, agregados, modificados, eliminados);

    res.json({
      success: true,
      message: 'Pedido ajustado correctamente'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { crearPedido, obtenerDetallePedido,actualizarEstadoPedido,AddproductoPedido,getPedidosDelDia, ajustarPedido };