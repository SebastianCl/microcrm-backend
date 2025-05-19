const pedidoService = require('../services/pedido.service');

const crearPedido = async (req, res, next) => {
  try {
    const pedidoId = await pedidoService.crearPedido(req.body);
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
    const { estado } = req.body;
    await pedidoService.actualizarEstadoPedido(Number(id), estado);
    res.json({ success: true, message: 'Estado actualizado' });
  } catch (error) {
    next(error);
  }
};

module.exports = { crearPedido, obtenerDetallePedido,actualizarEstadoPedido };