const ventasRepo = require('../repositories/ventas.repository');
const ApiError = require('../utils/apiError');

const getAllVentas = async () => {
    return await ventasRepo.getAllVentas();
};

const getVentaById = async (id) => {
    return await ventasRepo.getVentaById(id);
};

const getDetallesVentaById = async(id) => {
    return await ventasRepo.getDetallesVentaById(id);
};

const createVenta = async (data) => {
    const {id_cliente, id_usuario, fecha, total, productos} = data;
    
    if(!productos || productos.length === 0){
        throw new ApiError(400, 'Debe incluir al menos un producto en la venta');
    }
    
    const id_venta = await ventasRepo.createVenta(id_cliente, id_usuario, fecha, total);
    for(const producto of productos){
        await ventasRepo.insertarDetalleVenta(id_venta, producto);
    }

    return id_venta;
};

const getVentasPorFecha = async ({ fecha, fecha_inicio, fecha_fin }) => {
  return await ventasRepo.getVentasPorFecha({ fecha, fecha_inicio, fecha_fin });
};

module.exports = { 
    getAllVentas, 
    getVentaById, 
    getDetallesVentaById,  
    createVenta,
    getVentasPorFecha 
};
