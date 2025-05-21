const ventasService = require('../services/ventas.service');

const getAllVentas = async (req, res, next) => {
    try {
        const ventas = await ventasService.getAllVentas();
        res.status(200).json(ventas);
    } catch (err) {
        next(err);
    }
};

const getVentaById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const venta = await ventasService.getVentaById(id);
        res.status(200).json(venta);
    } catch (err) {
        next(err);
    }
};

const createVenta = async (req, res, next) => {
    try {
        const id_venta = await ventasService.createVenta(req.body);
        res.status(201).json({ message: 'Venta creada exitosamente', id_venta });
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllVentas, getVentaById, createVenta };
