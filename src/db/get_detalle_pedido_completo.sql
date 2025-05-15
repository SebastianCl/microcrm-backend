-- Funcion para Obtener el detalle del Pedido
CREATE OR REPLACE FUNCTION get_detalle_pedido_completo(p_id_pedido INT)
RETURNS TABLE (
    id_detalle_pedido INT,
    producto VARCHAR,
    cantidad INT,
    precio_unitario NUMERIC,
    descuento NUMERIC,
    adicion VARCHAR,
    precio_adicion NUMERIC,
    cantidad_adicion INT,
    mesa VARCHAR
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        dp.id_detalle_pedido,
        p.nombre,
        dp.cantidad,
        dp.precio_unitario,
        dp.descuento,
        ap.nombre,
        ap.precio_extra,
        dpa.cantidad,
        COALESCE(m.nombre_mesa, 
            CASE 
                WHEN pe.tipo_pedido = 'para_llevar' THEN 'Para llevar'
                ELSE 'N/A'
            END)
    FROM 
        detalle_pedido dp
    INNER JOIN productos p ON p.id_producto = dp.id_producto
    LEFT JOIN detalle_pedido_adiciones dpa ON dpa.id_detalle_pedido = dp.id_detalle_pedido
    LEFT JOIN adiciones_producto ap ON ap.id_adicion = dpa.id_adicion
    INNER JOIN pedidos pe ON pe.id_pedido = dp.id_pedido
    LEFT JOIN mesas m ON m.id_mesa = pe.id_mesa
    WHERE 
        dp.id_pedido = p_id_pedido;
END;
$$ LANGUAGE plpgsql;
-- Como usarlo
-- SELECT * FROM get_detalle_pedido_completo(4);