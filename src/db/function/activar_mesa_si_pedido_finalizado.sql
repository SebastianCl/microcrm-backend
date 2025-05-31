CREATE OR REPLACE FUNCTION activar_mesa_si_pedido_finalizado()
RETURNS TRIGGER AS $$
DECLARE
    v_estado TEXT;
BEGIN
    IF NEW.id_mesa IS NOT NULL AND NEW.id_estado IS DISTINCT FROM OLD.id_estado THEN
        SELECT nombre_estado INTO v_estado
        FROM estado
        WHERE id_estado = NEW.id_estado;

        IF v_estado = 'Finalizado' THEN
            UPDATE mesas
            SET activa = TRUE
            WHERE id_mesa = NEW.id_mesa;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;