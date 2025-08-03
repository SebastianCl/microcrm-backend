const facturaService = require('../services/factura.service');

const generarFacturaPdf = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pdfStream = await facturaService.generarFacturaPdf(Number(id));

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=factura_${id}.pdf`);
    pdfStream.pipe(res);
    pdfStream.end();

  } catch (error) {
    next(error);
  }
};

const generarFacturaBase64 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const base64pdf = await facturaService.generarFacturaBase64(Number(id));

    res.json({
      success: true,
      data: {
        base64: base64pdf,
        mime: 'application/pdf',
        filename: `factura_${id}.pdf`
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { generarFacturaPdf,generarFacturaBase64 };