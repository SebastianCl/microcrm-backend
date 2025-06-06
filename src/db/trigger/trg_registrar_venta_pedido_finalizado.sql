CREATE TRIGGER trg_registrar_venta_pedido_finalizado
AFTER UPDATE ON pedidos
FOR EACH ROW
WHEN (OLD.id_estado IS DISTINCT FROM NEW.id_estado)
EXECUTE FUNCTION registrar_venta_desde_pedido();