CREATE OR REPLACE FUNCTION get_top_productos_mas_vendidos(
    p_fecha_inicio DATE DEFAULT NULL,
    p_fecha_fin DATE DEFAULT NULL,
    p_limit INT DEFAULT 5
)
RETURNS TABLE (
    id_producto INT,
    producto TEXT,
    total_vendido BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pr.id_producto,
        pr.nombre::TEXT AS producto,  
        SUM(dp.cantidad) AS total_vendido
    FROM detalle_pedido dp
    JOIN productos pr ON pr.id_producto = dp.id_producto
    JOIN pedidos pe ON pe.id_pedido = dp.id_pedido
    JOIN ventas v ON v.id_pedido = pe.id_pedido  
    WHERE 
        pe.id_estado = 5  
        AND (
            (p_fecha_inicio IS NULL AND p_fecha_fin IS NULL AND DATE(v.fecha) = CURRENT_DATE)
            OR (p_fecha_inicio IS NOT NULL AND p_fecha_fin IS NULL AND DATE(v.fecha) = p_fecha_inicio)
            OR (p_fecha_inicio IS NOT NULL AND p_fecha_fin IS NOT NULL AND DATE(v.fecha) BETWEEN p_fecha_inicio AND p_fecha_fin)
        )
    GROUP BY pr.id_producto, pr.nombre
    ORDER BY total_vendido DESC
    LIMIT p_limit;
END;
$$;

--SELECT * FROM get_top_productos_mas_vendidos(); top 5
--SELECT * FROM get_top_productos_mas_vendidos('2025-07-20', NULL); top 5
--SELECT * FROM get_top_productos_mas_vendidos('2025-07-01', '2025-07-20', 10); Top 10 productos en un rango