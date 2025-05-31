-- Funcion para obtener adiciones asociadas al producto.
CREATE OR REPLACE FUNCTION get_adiciones_por_producto(p_id_producto INT)
RETURNS TABLE (
    id_producto INT,
    nombre_producto VARCHAR,
    id_adicion INT,
    nombre_adicion VARCHAR,
    precio_extra DECIMAL
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id_producto,
        p.nombre AS nombre_producto,
        ap.id_adicion,
        ap.nombre AS nombre_adicion,
        ap.precio_extra
    FROM 
        adiciones_producto ap
    JOIN 
        productos p ON p.id_producto = ap.id_producto
    WHERE 
        ap.id_producto = p_id_producto;
END;
$$ LANGUAGE plpgsql;

-- Como usarla
-- SELECT * FROM get_adiciones_por_producto(1);