const db = require('../config/db');

const facturaExiste = async (id_venta) => {
  const result = await db.query('SELECT id_factura FROM facturas WHERE id_venta = $1', [id_venta]);
  return result.rowCount > 0;
};

const crearFactura = async (id_venta) => {
  await db.query(
    `INSERT INTO facturas (id_venta, fecha, monto_total)
     SELECT $1, CURRENT_TIMESTAMP, total FROM ventas WHERE id_venta = $1`,
    [id_venta]
  );
};

const getFactura = async (id_venta) => {
  const result = await db.query('SELECT * FROM facturas WHERE id_venta = $1', [id_venta]);
  return result.rows[0];
};

const getVenta = async (id_venta) => {
  const result = await db.query('SELECT * FROM ventas WHERE id_venta = $1', [id_venta]);
  return result.rows[0];
};

const getDetalleVenta = async (id_venta) => {
  const result = await db.query(
    `SELECT * FROM detalle_venta WHERE id_venta = $1`,
    [id_venta]
  );
  return result.rows;
};

const getDetalleVentaEnriquecido = async (id_venta) => {
  const result = await db.query('SELECT * FROM get_detalle_venta($1)', [id_venta]);
  return result.rows;
};

module.exports = {
  facturaExiste,
  crearFactura,
  getFactura,
  getVenta,
  getDetalleVenta,
  getDetalleVentaEnriquecido
};