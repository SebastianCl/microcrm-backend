CREATE TRIGGER trg_activar_mesa_si_estado_final
AFTER UPDATE ON pedidos
FOR EACH ROW
WHEN (OLD.id_estado IS DISTINCT FROM NEW.id_estado)
EXECUTE FUNCTION activar_mesa_si_pedido_finalizado();