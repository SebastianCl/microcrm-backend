-- Funcion para obtener los pedidos del dia, filtrando por los estados.
CREATE OR REPLACE FUNCTION get_pedidos_del_dia(f_estado_pedido character varying DEFAULT NULL)
RETURNS TABLE (
    id_pedido INT,
    fecha TIMESTAMP,
    tipo_pedido character varying,
    estado character varying,
    nombre_mesa character varying,
    nombre_usuario character varying,
    nombre_cliente character varying,
    id_venta INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pe.id_pedido,
        pe.fecha,
        pe.tipo_pedido::character varying,
        es.nombre_estado AS estado,
        COALESCE(m.nombre_mesa, 
            CASE WHEN pe.tipo_pedido = 'para_llevar' THEN 'Para llevar' ELSE 'N/A' END),
        u.nombre_usuario,
        c.nombre AS nombre_cliente,
        pe.id_venta
    FROM pedidos pe
    LEFT JOIN mesas m ON pe.id_mesa = m.id_mesa
    INNER JOIN usuarios u ON pe.id_usuario = u.id_usuario
    INNER JOIN clientes c ON u.id_cliente = c.id_cliente
    LEFT JOIN estado es ON pe.id_estado = es.id_estado
    WHERE 
        DATE(pe.fecha) = CURRENT_DATE
        AND (
            f_estado_pedido IS NULL
            OR es.nombre_estado = f_estado_pedido
        )
    ORDER BY pe.fecha;
END;
$$ LANGUAGE plpgsql;

--DROP FUNCTION IF EXISTS get_pedidos_del_dia(character varying);
-- Para filtrar por estado
-- SELECT * FROM get_pedidos_del_dia('Pendiente');
-- sin filtro trae todos los pedidos creado del dia
-- SELECT * FROM get_pedidos_del_dia();