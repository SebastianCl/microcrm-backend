--Desactiva la mesa para un pedido relacionado a una mesa. 
CREATE OR REPLACE FUNCTION desactivar_mesa_al_crear_pedido()
RETURNS TRIGGER AS $$
BEGIN
    -- Solo si hay mesa asociada
    IF NEW.id_mesa IS NOT NULL THEN
        UPDATE mesas
        SET activa = FALSE
        WHERE id_mesa = NEW.id_mesa;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;