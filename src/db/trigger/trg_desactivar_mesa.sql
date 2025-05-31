CREATE TRIGGER trg_desactivar_mesa
AFTER INSERT ON pedidos
FOR EACH ROW
EXECUTE FUNCTION desactivar_mesa_al_crear_pedido();