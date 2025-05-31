--Obtener ventas por fechas o sin fechas. 
CREATE OR REPLACE FUNCTION get_ventas_por_fecha(
    p_fecha_especifica DATE DEFAULT NULL,
    p_fecha_inicio DATE DEFAULT NULL,
    p_fecha_fin DATE DEFAULT NULL
)
RETURNS TABLE (
    id_venta INT,
    fecha TIMESTAMP,
    total NUMERIC,
    nombre_cliente VARCHAR,
    nombre_usuario VARCHAR
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.id_venta,
        v.fecha,
        v.total,
        c.nombre AS nombre_cliente,
        u.nombre_usuario
    FROM ventas v
    INNER JOIN clientes c ON v.id_cliente = c.id_cliente
    INNER JOIN usuarios u ON v.id_usuario = u.id_usuario
    WHERE 
        (
            p_fecha_especifica IS NOT NULL AND DATE(v.fecha) = p_fecha_especifica
        )
        OR (
            p_fecha_especifica IS NULL 
            AND p_fecha_inicio IS NOT NULL 
            AND p_fecha_fin IS NOT NULL 
            AND DATE(v.fecha) BETWEEN p_fecha_inicio AND p_fecha_fin
        )
        OR (
            p_fecha_especifica IS NULL 
            AND p_fecha_inicio IS NULL 
            AND p_fecha_fin IS NULL
        )
    ORDER BY v.fecha;
END;
$$ LANGUAGE plpgsql;
--Filtro por rango de fechas
SELECT * FROM get_ventas_por_fecha(NULL, '2024-05-01', '2025-05-21');
--Filtro por fecha
SELECT * FROM get_ventas_por_fecha('2025-05-21');
--Filtro sin fecha
SELECT * FROM get_ventas_por_fecha();