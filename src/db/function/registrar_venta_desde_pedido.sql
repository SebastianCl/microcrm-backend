CREATE OR REPLACE FUNCTION registrar_venta_desde_pedido()
RETURNS TRIGGER AS $$
DECLARE
    v_total DECIMAL := 0;
    v_id_venta INT;
    v_valor_domi DECIMAL := COALESCE(NEW.valor_domi, 0);
    v_valor_descu DECIMAL := COALESCE(NEW.valor_descu, 0);
BEGIN
    -- Solo si el nuevo estado es 'finalizado'
    IF NEW.id_estado = (SELECT id_estado FROM estado WHERE nombre_estado = 'Finalizado') THEN

        -- Crear la venta principal (total se calcula más adelante)
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

        -- Insertar adiciones del pedido
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

        -- Calcular el total sumando productos y adiciones
        SELECT SUM(cantidad * precio_unitario)
        INTO v_total
        FROM detalle_venta
        WHERE id_venta = v_id_venta;

        -- Ajustar total con valor_domi y valor_descu
        v_total := v_total + v_valor_domi - v_valor_descu;

        -- Actualizar total en la tabla ventas
        UPDATE ventas
        SET total = v_total
        WHERE id_venta = v_id_venta;

        -- Registrar el id_venta en el pedido
        UPDATE pedidos
        SET id_venta = v_id_venta
        WHERE id_pedido = NEW.id_pedido;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;