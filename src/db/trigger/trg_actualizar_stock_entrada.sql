CREATE TRIGGER trg_actualizar_stock_entrada
AFTER INSERT ON inventarios
FOR EACH ROW
EXECUTE FUNCTION actualizar_stock_por_entrada();

-- Este trg se activa cuando se realiza un INSERT de tipo entrada