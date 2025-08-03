const facturaRepo = require('../repositories/factura.repository');
const ApiError = require('../utils/apiError');
const PDFDocument = require('pdfkit');
const { Buffer } = require('buffer');

const generarFacturaBase64 = async (id_venta) => {
    const existe = await facturaRepo.facturaExiste(id_venta);
  if (!existe) await facturaRepo.crearFactura(id_venta);

  const factura = await facturaRepo.getFactura(id_venta);
  const detalle = await facturaRepo.getDetalleVentaEnriquecido(id_venta);

  if (!detalle || detalle.length === 0) throw new ApiError(404, 'No hay detalle para esta venta');

  const cliente = detalle[0].nombre_cliente || 'Cliente';
  const usuario = detalle[0].nombre_usuario || 'Usuario';
  const total_venta = parseFloat(detalle[0].total_venta || 0);

  const buffer = [];
  const doc = new PDFDocument({ size: 'LETTER', margin: 50 });

  doc.on('data', chunk => buffer.push(chunk));
  doc.on('end', () => {});

  // --- Cabecera ---
  doc.font('Helvetica-Bold').fontSize(20).text('FACTURA', 50, 50);
  doc.font('Helvetica').fontSize(10).text(`Factura N°: ${factura.id_factura}`, 50, 70);
  doc.text(`Fecha: ${new Date(factura.fecha).toLocaleDateString()}`, 50, 85);

  // --- Cuadro de cliente y empresa DATOS QUEMADOS DE PRUEBA---
  doc.rect(50, 100, 500, 90).stroke();

  doc.font('Helvetica-Bold').fontSize(10).text('DATOS DEL CLIENTE', 60, 110);
  doc.font('Helvetica').fontSize(9)
    .text(cliente, 60, 125)
    .text('Correo no disponible', 60, 140)
    .text('Teléfono no disponible', 60, 155)
    .text('Dirección no disponible', 60, 170);

  doc.font('Helvetica-Bold').fontSize(10).text('DATOS DE LA EMPRESA', 310, 110);
  doc.font('Helvetica').fontSize(9)
    .text(usuario, 310, 125)
    .text('Correo empresa', 310, 140)
    .text('Teléfono empresa', 310, 155)
    .text('Dirección empresa', 310, 170);

  // --- Tabla de detalle ---
  let y = 210;

  doc.fillColor('black').rect(50, y, 500, 20).fill();
  doc.fillColor('white').font('Helvetica-Bold').fontSize(10);
  doc.text('Detalle', 55, y + 5);
  doc.text('Cantidad', 250, y + 5);
  doc.text('Precio', 350, y + 5);
  doc.text('Total', 430, y + 5);

  y += 25;
  doc.fillColor('black').font('Helvetica').fontSize(9);
  detalle.forEach(item => {
    const nombre = item.tipo === 'producto' ? item.producto : `+ ${item.adicion}`;
    doc.text(nombre, 55, y);
    doc.text(item.cantidad?.toString() || '0', 260, y);
    doc.text(`${formatCurrency(item.precio_unitario)}`, 350, y);
    doc.text(`${formatCurrency(item.total_linea)}`, 430, y);
    y += 15;
  });

  // --- Totales e IVA 0 POR EL MOMENTO---
  const iva = 0;
  const iva_valor = (total_venta * iva).toFixed(2);
  const total_final = total_venta.toFixed(2);

  // y += 20;
  // doc.font('Helvetica-Bold').fontSize(10)
  //   .text('IVA', 55, y)
  //   .text('N/A%', 100, y)
  //   .text(`$${iva_valor}`, 200, y);

  y += 25;
  doc.font('Helvetica-Bold').fontSize(14)
    .text('TOTAL', 55, y)
    .text(`$${total_final}`, 120, y);

  // --- Información de pago OPCIONAL POR EL MOMENTO.
  y += 60;
  doc.font('Helvetica-Bold').fontSize(10).text('INFORMACIÓN DE PAGO', 55, y);
  doc.font('Helvetica').fontSize(9)
    .text('Banco: Ensigna', 55, y + 15)
    .text(`Nombre: ${cliente}`, 55, y + 30)
    .text('Número de cuenta: 0000-0000-0000', 55, y + 45);

  // --- Agradecimiento FIN DE PAGINA---
  doc.font('Helvetica-Bold').fontSize(12).text('GRACIAS', 450, y + 70);

  // Finalizar PDF
  doc.end();

  const pdfBuffer = await new Promise(resolve => {
    doc.on('end', () => resolve(Buffer.concat(buffer)));
  });

  return pdfBuffer.toString('base64');

};

const formatCurrency = (value) => {
  const num = parseFloat(value);
  return Number.isInteger(num) ? `${num}` : `${num.toFixed(2)}`;
};
module.exports = {generarFacturaBase64 };