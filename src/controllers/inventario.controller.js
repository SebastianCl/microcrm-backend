const inventarioService = require('../services/inventario.service');
const productService = require('../services/product.service');
const errors = require('../utils/errors');

const getInventoryRecords = async (req, res, next) => {
    try {
        const records = await inventarioService.getAllRecords();
        res.status(200).json(records);
    } catch (err) {
        next(err);
    }
};

const getInventoryByProductId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const inventario = await inventarioService.getInventoryByProductId(id);
        res.status(200).json(inventario);
    } catch (err) {
        next(err);
    }
};

const createInventoryMovement = async (req, res, next) => {
    try {
        const { id_producto, cantidad, tipo_movimiento, fecha, comentario } = req.body;

        await inventarioService.createInventoryMovement({
            id_producto,
            cantidad,
            tipo_movimiento,
            fecha,
            comentario
        });

        res.status(201).json({ message: 'Movimiento registrado correctamente.' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getInventoryRecords,
    getInventoryByProductId,
    createInventoryMovement
};
