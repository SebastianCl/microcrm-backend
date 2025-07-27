const financeRepository = require('../repositories/finance.repository');
const summary = async(fecha_inicio = null, fecha_final = null) => {
  const pedidos = await financeRepository.pedidos_por_tipo(fecha_inicio, fecha_final);

  const ventas = await financeRepository.ventas_por_medio_pago(fecha_inicio, fecha_final);
  
  const topProductos = await financeRepository.top_productos_mas_vendidos(fecha_inicio, fecha_final);

  const productosMenorStock = await financeRepository.productos_con_menos_stock();
  
  const gastos = await financeRepository.total_gastos_fecha(fecha_inicio, fecha_final);
  
  const totalGastos = gastos.reduce((suma, gasto) => suma + parseFloat(gasto.monto), 0);
  const ticketPromedio = ventas[2].total / (pedidos[0].cantidad_pedidos + pedidos[1].cantidad_pedidos); 
  const flujoNetoCaja = ventas[2].total - totalGastos;


  const resumenFinanciero = {
      pedidos_por_tipo: pedidos,
      ventas_por_medio_pago: ventas,
      ticket_promedio: parseFloat(ticketPromedio.toFixed(2)) || 0,
      top_productos_mas_vendidos: topProductos,
      productos_con_menos_stock: productosMenorStock,
      total_gastos_fecha: totalGastos,
      flujo_neto_caja: flujoNetoCaja
  };

  return resumenFinanciero;
};


module.exports = {
  summary
};