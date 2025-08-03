CREATE OR REPLACE FUNCTION actualizar_stock_y_registrar_salida()
RETURNS TRIGGER AS $$
BEGIN
    -- Solo aplica si hay producto (no adición) y maneja inventario
    IF NEW.id_producto IS NOT NULL THEN

        -- 1. Actualizar el stock del producto
        UPDATE productos
        SET stock = stock - NEW.cantidad
        WHERE id_producto = NEW.id_producto
          AND maneja_inventario = TRUE;

        -- 2. Registrar el movimiento de salida en inventarios
        INSERT INTO inventarios (
            id_producto,
            cantidad,
            tipo_movimiento,
            comentario
        )
        SELECT
            NEW.id_producto,
            NEW.cantidad,
            'salida',
            'Salida por venta'
        WHERE EXISTS (
            SELECT 1 FROM productos
            WHERE id_producto = NEW.id_producto
              AND maneja_inventario = TRUE
        );

    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;