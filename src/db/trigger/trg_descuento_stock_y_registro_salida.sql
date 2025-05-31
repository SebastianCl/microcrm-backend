CREATE TRIGGER trg_descuento_stock_y_registro_salida
AFTER INSERT ON detalle_venta
FOR EACH ROW
EXECUTE FUNCTION actualizar_stock_y_registrar_salida();

-- Se activa al momento de INSERT en detalle venta, para productos que manejan STOCK
-- EJMP
-- INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario)
-- VALUES (3, 2, 5, 2000.00);  -- producto 2 × 5 unidades