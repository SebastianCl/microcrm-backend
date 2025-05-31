--Funcion para obtener detalle de una venta.
CREATE OR REPLACE FUNCTION get_detalle_venta(p_id_venta INT)
RETURNS TABLE (
    id_detalle_venta INT,
    producto VARCHAR,
    adicion VARCHAR,
    cantidad INT,
    precio_unitario NUMERIC,
    total_linea NUMERIC,
    tipo VARCHAR,
    nombre_cliente VARCHAR,
    nombre_usuario VARCHAR,
    total_venta NUMERIC
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        dv.id_detalle_venta,
        p.nombre AS producto,
        a.nombre AS adicion,
        dv.cantidad,
        dv.precio_unitario,
        dv.cantidad * dv.precio_unitario AS total_linea,
        CASE 
            WHEN dv.id_producto IS NOT NULL THEN 'producto'
            WHEN dv.id_adicion IS NOT NULL THEN 'adicion'
            ELSE 'otro'
        END::character varying AS tipo,
        c.nombre AS nombre_cliente,
        u.nombre_usuario,
        (
            SELECT SUM(dv2.cantidad * dv2.precio_unitario)
            FROM detalle_venta dv2
            WHERE dv2.id_venta = v.id_venta
        ) AS total_venta
    FROM detalle_venta dv
    INNER JOIN ventas v ON dv.id_venta = v.id_venta
    INNER JOIN clientes c ON v.id_cliente = c.id_cliente
    INNER JOIN usuarios u ON v.id_usuario = u.id_usuario
    LEFT JOIN productos p ON dv.id_producto = p.id_producto
    LEFT JOIN adiciones_producto a ON dv.id_adicion = a.id_adicion
    WHERE dv.id_venta = p_id_venta;
END;
$$ LANGUAGE plpgsql;
--USO
-- SELECT * FROM get_detalle_venta(6);