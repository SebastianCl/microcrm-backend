-- Funcion para Obtener el detalle del Pedido
CREATE OR REPLACE FUNCTION public.get_detalle_pedido_completo(p_id_pedido integer)
RETURNS TABLE(
    id_detalle_pedido integer, 
    producto character varying, 
    cantidad integer, 
    precio_unitario numeric, 
    descuento numeric, 
    adicion character varying, 
    precio_adicion numeric, 
    cantidad_adicion integer, 
    mesa character varying,
    estado_pedido character varying,
    nombre_cliente character varying,
    nombre_usuario character varying,
    correo_cliente character varying
)
LANGUAGE plpgsql
AS $function$
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
            END),
        pe.estado::character varying,
        c.nombre AS nombre_cliente,
        u.nombre_usuario,
        c.correo AS correo_cliente
    FROM 
        detalle_pedido dp
    INNER JOIN productos p ON p.id_producto = dp.id_producto
    INNER JOIN pedidos pe ON pe.id_pedido = dp.id_pedido
    INNER JOIN usuarios u ON pe.id_usuario = u.id_usuario
    INNER JOIN clientes c ON u.id_cliente = c.id_cliente
    LEFT JOIN detalle_pedido_adiciones dpa ON dpa.id_detalle_pedido = dp.id_detalle_pedido
    LEFT JOIN adiciones_producto ap ON ap.id_adicion = dpa.id_adicion
    LEFT JOIN mesas m ON m.id_mesa = pe.id_mesa
    WHERE 
        dp.id_pedido = p_id_pedido;
END;
$function$;
-- Como usarlo
-- SELECT * FROM get_detalle_pedido_completo(4);