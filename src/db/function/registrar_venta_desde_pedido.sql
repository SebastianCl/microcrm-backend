CREATE OR REPLACE FUNCTION registrar_venta_desde_pedido()
RETURNS TRIGGER AS $$
DECLARE
    v_total DECIMAL := 0;
    v_id_venta INT;
BEGIN
    -- Solo si el nuevo estado es 'finalizado'
    IF NEW.id_estado = (SELECT id_estado FROM estado WHERE nombre_estado = 'Finalizado') THEN

        -- Crear la venta principal
        INSERT INTO ventas (id_cliente, id_usuario, fecha, total, id_pedido)
        VALUES (
            NEW.id_cliente,
            NEW.id_usuario,
            CURRENT_TIMESTAMP,
            0,
            NEW.id_pedido
        )
        RETURNING id_venta INTO v_id_venta;

        -- Insertar productos del pedido
        INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario)
        SELECT 
            v_id_venta,
            dp.id_producto,
            dp.cantidad,
            dp.precio_unitario
        FROM detalle_pedido dp
        WHERE dp.id_pedido = NEW.id_pedido;

        -- Insertar adiciones del pedido (con id_adicion correctamente guardado)
        INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario, id_adicion)
        SELECT 
            v_id_venta,
            NULL,
            dpa.cantidad,
            ap.precio_extra,
            ap.id_adicion
        FROM detalle_pedido dp
        JOIN detalle_pedido_adiciones dpa ON dpa.id_detalle_pedido = dp.id_detalle_pedido
        JOIN adiciones_producto ap ON ap.id_adicion = dpa.id_adicion
        WHERE dp.id_pedido = NEW.id_pedido;

        -- Calcular y actualizar el total de la venta
        UPDATE ventas
        SET total = (
            SELECT SUM(cantidad * precio_unitario)
            FROM detalle_venta
            WHERE id_venta = v_id_venta
        )
        WHERE id_venta = v_id_venta;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;