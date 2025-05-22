CREATE OR REPLACE FUNCTION actualizar_stock_por_entrada()
RETURNS TRIGGER AS $$
BEGIN
    -- Solo actualizar si maneja inventario y es un movimiento de entrada
    IF NEW.tipo_movimiento = 'entrada' THEN
        UPDATE productos
        SET stock = COALESCE(stock, 0) + NEW.cantidad
        WHERE id_producto = NEW.id_producto
          AND maneja_inventario = TRUE;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;