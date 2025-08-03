CREATE OR REPLACE FUNCTION actualizar_stock_por_entrada()
RETURNS TRIGGER AS $$
BEGIN
    -- Solo aplica si el producto maneja inventario
    IF NEW.tipo_movimiento = 'entrada' THEN
        UPDATE productos
        SET stock = COALESCE(stock, 0) + NEW.cantidad
        WHERE id_producto = NEW.id_producto
          AND maneja_inventario = TRUE;

    ELSIF NEW.tipo_movimiento = 'salida' THEN
        UPDATE productos
        SET stock = GREATEST(COALESCE(stock, 0) - NEW.cantidad, 0)  -- Evita stock negativo
        WHERE id_producto = NEW.id_producto
          AND maneja_inventario = TRUE;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;