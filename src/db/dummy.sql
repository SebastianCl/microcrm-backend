
-- Script definitivo para flujo completo en PostgreSQL (sin IDs forzados)
-- Generado: 2025-05-15 22:36:58

-- Limpiar base de datos (entorno de pruebas)
TRUNCATE TABLE 
    facturas, detalle_venta, ventas,
    detalle_pedido_adiciones, detalle_pedido, pedidos,
    inventarios, adiciones_producto, productos,
    mesas, configuraciones, usuarios, clientes
RESTART IDENTITY CASCADE;

-- Cliente y usuario
INSERT INTO clientes (nombre, correo, telefono) VALUES 
('Heladería Delicias', 'contacto@delicias.com', '3101234567');

INSERT INTO usuarios (id_cliente, nombre_usuario, contrasena, rol) VALUES 
(1, 'admin', 'admin123', 'admin');

-- Configuraciones activadas
INSERT INTO configuraciones (id_cliente, modulo, activo) VALUES
(1, 'pedidos', TRUE), (1, 'productos', TRUE), (1, 'ventas', TRUE),
(1, 'inventarios', TRUE), (1, 'promociones', TRUE), (1, 'combos', TRUE),
(1, 'gastos', TRUE), (1, 'devoluciones', TRUE), (1, 'facturas', TRUE);

-- Mesas
INSERT INTO mesas (id_cliente, nombre_mesa) VALUES 
(1, 'Mesa 1'), (1, 'Mesa 2'), (1, 'Mesa 3');

-- Productos
INSERT INTO productos (nombre, descripcion, precio, stock, maneja_inventario) VALUES
('Ensalada de frutas', 'Frutas mixtas con miel', 10000.00, NULL, FALSE),
('Banana Split', 'Helado con banana, sirope y crema', 12000.00, NULL, FALSE),
('Paleta de fresa', 'Paleta helada sabor fresa', 3000.00, 50, TRUE),
('Paleta de chocolate', 'Paleta helada sabor chocolate', 3200.00, 40, TRUE);

-- Adiciones
INSERT INTO adiciones_producto (id_producto, nombre, precio_extra) VALUES
(1, 'Queso rallado', 1000.00),
(1, 'Chantilly', 1500.00),
(2, 'Sirope de fresa', 1000.00),
(2, 'Nueces', 1200.00);

-- Inventario
INSERT INTO inventarios (id_producto, cantidad, tipo_movimiento, comentario) VALUES
(3, 50, 'entrada', 'Carga inicial'),
(4, 40, 'entrada', 'Carga inicial');

-- Pedido 1: Mesa 1 con ensaladas + adiciones + venta + factura
WITH pedido AS (
    INSERT INTO pedidos (id_cliente, id_usuario, id_mesa, tipo_pedido, fecha)
    VALUES (1, 1, 1, 'en_mesa', '2024-05-01 14:00:00')
    RETURNING id_pedido
), detalle AS (
    INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario)
    SELECT id_pedido, 1, 2, 10000.00 FROM pedido
    RETURNING id_detalle_pedido
)
INSERT INTO detalle_pedido_adiciones (id_detalle_pedido, id_adicion, cantidad)
SELECT id_detalle_pedido, 1, 2 FROM detalle
UNION ALL
SELECT id_detalle_pedido, 2, 2 FROM detalle;

WITH venta AS (
    INSERT INTO ventas (id_cliente, id_usuario, fecha, total)
    VALUES (1, 1, '2024-05-01 14:10:00', 24000.00)
    RETURNING id_venta
)
INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario)
SELECT id_venta, 1, 2, 10000.00 FROM venta;

INSERT INTO facturas (id_venta, fecha, monto_total)
SELECT id_venta, '2024-05-01 14:15:00', 24000.00 FROM ventas ORDER BY id_venta DESC LIMIT 1;

-- Pedido 2: Para llevar - paletas sin factura
WITH pedido AS (
    INSERT INTO pedidos (id_cliente, id_usuario, tipo_pedido, fecha)
    VALUES (1, 1, 'para_llevar', '2024-05-02 16:30:00')
    RETURNING id_pedido
)
INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario)
SELECT id_pedido, 3, 3, 3000.00 FROM pedido
UNION ALL
SELECT id_pedido, 4, 2, 3200.00 FROM pedido;

WITH venta AS (
    INSERT INTO ventas (id_cliente, id_usuario, fecha, total)
    VALUES (1, 1, '2024-05-02 16:40:00', 15400.00)
    RETURNING id_venta
)
INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario)
SELECT id_venta, 3, 3, 3000.00 FROM venta
UNION ALL
SELECT id_venta, 4, 2, 3200.00 FROM venta;
