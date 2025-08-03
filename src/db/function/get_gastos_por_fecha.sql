
CREATE OR REPLACE FUNCTION public.get_gastos_por_fecha(
    p_fecha_inicio DATE DEFAULT NULL,
    p_fecha_fin DATE DEFAULT NULL
)
RETURNS TABLE (
    id_gasto INT,
    descripcion TEXT,
    monto NUMERIC,
    fecha TIMESTAMP,
    nombre_tipo character varying,
    descripcion_tipo character varying,
    nombre_usuario character varying
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        g.id_gasto,
        g.descripcion,
        g.monto,
        g.fecha,
        tg.nombre_tipo,
        tg.descripcion::character varying,
        u.nombre_usuario
    FROM gastos g
    LEFT JOIN tipos_gasto tg ON tg.id_tipo_gasto = g.id_tipo_gasto
    LEFT JOIN usuarios u ON u.id_usuario = g.id_usuario
    WHERE 
        (
            p_fecha_inicio IS NULL AND p_fecha_fin IS NULL 
            AND DATE(g.fecha) = CURRENT_DATE
        )
        OR (
            p_fecha_inicio IS NOT NULL AND p_fecha_fin IS NULL 
            AND DATE(g.fecha) = p_fecha_inicio
        )
        OR (
            p_fecha_inicio IS NOT NULL AND p_fecha_fin IS NOT NULL 
            AND DATE(g.fecha) BETWEEN p_fecha_inicio AND p_fecha_fin
        )
    ORDER BY g.fecha DESC;
END;
$$ LANGUAGE plpgsql;

-- Default fecha del dia
SELECT * FROM get_gastos_por_fecha();

-- Gastos de una fecha específica
SELECT * FROM get_gastos_por_fecha('2025-05-22', NULL);

-- Gastos en un rango
SELECT * FROM get_gastos_por_fecha('2025-05-01', '2025-06-30');