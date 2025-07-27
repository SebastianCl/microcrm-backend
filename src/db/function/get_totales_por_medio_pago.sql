CREATE OR REPLACE FUNCTION get_totales_por_medio_pago(
    p_fecha_inicio DATE DEFAULT NULL,
    p_fecha_fin DATE DEFAULT NULL
)
RETURNS TABLE (
    metodo_pago TEXT,
    total NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    WITH metodos_base AS (
        SELECT 'efectivo' AS metodo
        UNION ALL
        SELECT 'transferencia'
    ),
    ventas_filtradas AS (
        SELECT 
            v.total,
            p.medio_pago AS metodo,
            v.fecha
        FROM ventas v
        JOIN pedidos p ON p.id_pedido = v.id_pedido
        WHERE p.id_estado = 5
          AND (
                (p_fecha_inicio IS NULL AND p_fecha_fin IS NULL AND DATE(v.fecha) = CURRENT_DATE)
                OR (p_fecha_inicio IS NOT NULL AND p_fecha_fin IS NULL AND DATE(v.fecha) = p_fecha_inicio)
                OR (p_fecha_inicio IS NOT NULL AND p_fecha_fin IS NOT NULL AND DATE(v.fecha) BETWEEN p_fecha_inicio AND p_fecha_fin)
          )
    ),
    ventas_agrupadas AS (
        SELECT 
            vf.metodo,
            SUM(vf.total) AS total_sumado
        FROM ventas_filtradas vf
        GROUP BY vf.metodo
    ),
    totales_union AS (
        SELECT 
            mb.metodo,
            COALESCE(va.total_sumado, 0) AS total_sumado
        FROM metodos_base mb
        LEFT JOIN ventas_agrupadas va ON mb.metodo = va.metodo
    )
    SELECT metodo AS metodo_pago, total_sumado AS total
    FROM totales_union

    UNION ALL

    SELECT 
        'TOTAL GENERAL' AS metodo_pago,
        SUM(total_sumado) AS total
    FROM totales_union;
END;
$$;

-- SELECT * FROM get_totales_por_medio_pago(); Ventas del día actual
-- SELECT * FROM get_totales_por_medio_pago('2025-07-20', NULL); Ventas de un día específico
-- SELECT * FROM get_totales_por_medio_pago('2025-07-01', '2025-07-20'); Ventas en un rango