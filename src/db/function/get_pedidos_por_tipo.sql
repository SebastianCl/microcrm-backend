CREATE OR REPLACE FUNCTION get_pedidos_por_tipo(
    p_fecha_inicio DATE DEFAULT NULL,
    p_fecha_fin DATE DEFAULT NULL
)
RETURNS TABLE (
    tipo_pedido TEXT,
    cantidad_pedidos INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    WITH tipos_base AS (
        SELECT 'en_mesa'::tipo_pedido_pedido AS tipo_enum
        UNION ALL
        SELECT 'para_llevar'::tipo_pedido_pedido
    ),
    conteo AS (
        SELECT 
            p.tipo_pedido,
            COUNT(*)::INT AS cantidad   
        FROM pedidos p
        WHERE 
            (
                (p_fecha_inicio IS NULL AND p_fecha_fin IS NULL AND DATE(p.fecha) = CURRENT_DATE)
                OR (p_fecha_inicio IS NOT NULL AND p_fecha_fin IS NULL AND DATE(p.fecha) = p_fecha_inicio)
                OR (p_fecha_inicio IS NOT NULL AND p_fecha_fin IS NOT NULL AND DATE(p.fecha) BETWEEN p_fecha_inicio AND p_fecha_fin)
            )
        GROUP BY p.tipo_pedido
    )
    SELECT 
        tb.tipo_enum::text AS tipo_pedido,
        COALESCE(c.cantidad, 0) AS cantidad_pedidos
    FROM tipos_base tb
    LEFT JOIN conteo c ON tb.tipo_enum = c.tipo_pedido;
END;
$$;

--SELECT * FROM get_pedidos_por_tipo(); EL DIA
--SELECT * FROM get_pedidos_por_tipo('2025-07-20', NULL); SOLO UNA FECHA
--SELECT * FROM get_pedidos_por_tipo('2025-07-01', '2025-07-20'); RANGO