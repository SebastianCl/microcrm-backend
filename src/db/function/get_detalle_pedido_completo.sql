CREATE OR REPLACE FUNCTION public.get_detalle_pedido_completo(p_id_pedido integer)
RETURNS TABLE(
    id_detalle_pedido integer, 
    producto character varying, 
    cantidad integer, 
    precio_unitario numeric, 
    descuento numeric, 
    adiciones jsonb, 
    mesa character varying,
    estado_pedido character varying,
    nombre_cliente character varying,
    nombre_usuario character varying,
    correo_cliente character varying,
    total_pedido numeric,
    id_venta integer
)
LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    WITH total_pedido_cte AS ( 
        SELECT 
            dp.id_pedido,
            SUM((dp.precio_unitario - dp.descuento) * dp.cantidad + 
                COALESCE(ap.precio_extra * dpa.cantidad, 0)
            ) AS total_pedido
        FROM detalle_pedido dp
        LEFT JOIN detalle_pedido_adiciones dpa ON dpa.id_detalle_pedido = dp.id_detalle_pedido
        LEFT JOIN adiciones_producto ap ON ap.id_adicion = dpa.id_adicion
        WHERE dp.id_pedido = p_id_pedido
        GROUP BY dp.id_pedido
    )
    SELECT 
        dp.id_detalle_pedido,
        p.nombre AS producto,
        dp.cantidad,
        dp.precio_unitario,
        dp.descuento,
        COALESCE(
            jsonb_agg(
                DISTINCT jsonb_build_object(
                    'id_adicion', ap.id_adicion,
                    'nombre', ap.nombre,
                    'precio_extra', ap.precio_extra,
                    'cantidad', dpa.cantidad
                )
            ) FILTER (WHERE ap.id_adicion IS NOT NULL),
            '[]'::jsonb
        ) AS adiciones,
        COALESCE(m.nombre_mesa, 
            CASE 
                WHEN pe.tipo_pedido = 'para_llevar' THEN 'Para llevar'
                ELSE 'N/A'
            END) AS mesa,
        es.nombre_estado AS estado_pedido,
        c.nombre AS nombre_cliente,
        u.nombre_usuario,
        c.correo AS correo_cliente,
        t.total_pedido,
        pe.id_venta
    FROM 
        detalle_pedido dp
    INNER JOIN productos p ON p.id_producto = dp.id_producto
    INNER JOIN pedidos pe ON pe.id_pedido = dp.id_pedido
    INNER JOIN usuarios u ON pe.id_usuario = u.id_usuario
    INNER JOIN clientes c ON pe.id_cliente = c.id_cliente
    LEFT JOIN detalle_pedido_adiciones dpa ON dpa.id_detalle_pedido = dp.id_detalle_pedido
    LEFT JOIN adiciones_producto ap ON ap.id_adicion = dpa.id_adicion
    LEFT JOIN mesas m ON m.id_mesa = pe.id_mesa
    LEFT JOIN estado es ON es.id_estado = pe.id_estado
    LEFT JOIN total_pedido_cte t ON t.id_pedido = dp.id_pedido
    WHERE dp.id_pedido = p_id_pedido
    GROUP BY 
        dp.id_detalle_pedido,
        p.nombre,
        dp.cantidad,
        dp.precio_unitario,
        dp.descuento,
        m.nombre_mesa,
        pe.tipo_pedido,
        es.nombre_estado,
        c.nombre,
        u.nombre_usuario,
        c.correo,
        t.total_pedido,
        pe.id_venta;
END;
$function$;

--DROP FUNCTION IF EXISTS public.get_detalle_pedido_completo(integer); Elimar funcion. 