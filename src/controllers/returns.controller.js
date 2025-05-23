const returnsService = require('../services/returns.service');

const getAllReturns = async (req, res, next) => {
    try {
        const returns = await returnsService.getAllReturns();
        res.status(200).json(returns);
    } catch (err) {
        next(err);
    }
};

const getReturnById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const returnData = await returnsService.getReturnById(id);
        res.status(200).json(returnData);
    } catch (err) {
        next(err);
    }
};

const createReturn = async (req, res, next) => {
    try {
        const { id_venta, id_producto, cantidad, motivo, fecha } = req.body;
        const id_return = await returnsService.createReturn(id_venta, id_producto, cantidad, motivo, fecha);
        res.status(201).json({ id: id_return, message: 'Return created successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllReturns, getReturnById, createReturn }; 