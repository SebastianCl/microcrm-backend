DROP TABLE IF EXISTS detalle_pedido_adiciones, detalle_pedido, pedidos, mesas, detalle_venta, ventas, inventarios, productos, adiciones_producto, combos, combo_producto, promociones, gastos, devoluciones, facturas, configuraciones, usuarios, clientes CASCADE;

DROP TYPE IF EXISTS rol_usuarios CASCADE;
CREATE TYPE rol_usuarios AS ENUM('admin', 'empleado');

DROP TYPE IF EXISTS modulo_config CASCADE;
CREATE TYPE modulo_config AS ENUM('pedidos', 'productos', 'ventas', 'inventarios', 'promociones', 'combos', 'gastos', 'devoluciones', 'facturas');

DROP TYPE IF EXISTS tipo_movimiento_inventario CASCADE;
CREATE TYPE tipo_movimiento_inventario AS ENUM('entrada', 'salida');

DROP TYPE IF EXISTS tipo_pedido_pedido CASCADE;
CREATE TYPE tipo_pedido_pedido AS ENUM('en_mesa', 'para_llevar');

DROP TYPE IF EXISTS estado_pedido CASCADE;
CREATE TYPE estado_pedido AS ENUM('pendiente', 'procesado', 'cancelado');

DROP TYPE IF EXISTS tipo_gasto CASCADE;
CREATE TYPE tipo_gasto AS ENUM('diario', 'mensual');


CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255),
    telefono VARCHAR(20),
    estado BOOLEAN DEFAULT TRUE
);


CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    id_cliente INT,
    nombre_usuario VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol rol_usuarios DEFAULT 'empleado',
    estado BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);


CREATE TABLE configuraciones (
    id_configuracion SERIAL PRIMARY KEY,
    id_cliente INT,
    modulo modulo_config NOT NULL,
    activo BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);


CREATE TABLE mesas (
    id_mesa SERIAL PRIMARY KEY,
    id_cliente INT,
    nombre_mesa VARCHAR(100) NOT NULL,
    activa BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT NULL,
    maneja_inventario BOOLEAN DEFAULT TRUE,
    estado BOOLEAN DEFAULT TRUE
);

CREATE TABLE adiciones_producto (
    id_adicion SERIAL PRIMARY KEY,
    id_producto INT,
    nombre VARCHAR(255) NOT NULL,
    precio_extra DECIMAL(10,2) DEFAULT 0.00,
    estado BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE inventarios (
    id_inventario SERIAL PRIMARY KEY,
    id_producto INT,
    cantidad INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_movimiento tipo_movimiento_inventario,
    comentario TEXT,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INT,
    id_usuario INT,
    id_mesa INT DEFAULT NULL,
    tipo_pedido tipo_pedido_pedido DEFAULT 'en_mesa',
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado estado_pedido DEFAULT 'pendiente',
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_mesa) REFERENCES mesas(id_mesa)
);

CREATE TABLE detalle_pedido (
    id_detalle_pedido SERIAL PRIMARY KEY,
    id_pedido INT,
    id_producto INT,
    cantidad INT DEFAULT 1,
    precio_unitario DECIMAL(10,2),
    descuento DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE detalle_pedido_adiciones (
    id_detalle_pedido_adicion SERIAL PRIMARY KEY,
    id_detalle_pedido INT,
    id_adicion INT,
    cantidad INT DEFAULT 1,
    FOREIGN KEY (id_detalle_pedido) REFERENCES detalle_pedido(id_detalle_pedido),
    FOREIGN KEY (id_adicion) REFERENCES adiciones_producto(id_adicion)
);

CREATE TABLE ventas (
    id_venta SERIAL PRIMARY KEY,
    id_cliente INT,
    id_usuario INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE detalle_venta (
    id_detalle_venta SERIAL PRIMARY KEY,
    id_venta INT,
    id_producto INT,
    cantidad INT,
    precio_unitario DECIMAL(10,2),
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE promociones (
    id_promocion SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion TEXT,
    descuento_porcentaje DECIMAL(5,2),
    fecha_inicio DATE,
    fecha_fin DATE,
    estado BOOLEAN DEFAULT TRUE
);

CREATE TABLE combos (
    id_combo SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion TEXT,
    precio_combo DECIMAL(10,2),
    estado BOOLEAN DEFAULT TRUE
);

CREATE TABLE combo_producto (
    id_combo_producto SERIAL PRIMARY KEY,
    id_combo INT,
    id_producto INT,
    cantidad INT,
    FOREIGN KEY (id_combo) REFERENCES combos(id_combo),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE gastos (
    id_gasto SERIAL PRIMARY KEY,
    id_cliente INT,
    descripcion TEXT,
    monto DECIMAL(10,2),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo tipo_gasto,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

CREATE TABLE devoluciones (
    id_devolucion SERIAL PRIMARY KEY,
    id_venta INT,
    id_producto INT,
    cantidad INT,
    motivo TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE facturas (
    id_factura SERIAL PRIMARY KEY,
    id_venta INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    monto_total DECIMAL(10,2),
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta)
);


INSERT INTO clientes (id_cliente, nombre, correo, telefono) VALUES (1, 'Heladería Ejemplo', 'contacto@heladeria.com', '3001234567');
INSERT INTO usuarios (id_usuario, id_cliente, nombre_usuario, contrasena, rol) VALUES (1, 1, 'admin', 'admin123', 'admin');
INSERT INTO configuraciones (id_configuracion, id_cliente, modulo, activo) VALUES
(1, 1, 'pedidos', TRUE), (2, 1, 'productos', TRUE), (3, 1, 'ventas', TRUE),
(4, 1, 'inventarios', TRUE), (5, 1, 'promociones', TRUE), (6, 1, 'combos', TRUE),
(7, 1, 'gastos', TRUE), (8, 1, 'devoluciones', TRUE), (9, 1, 'facturas', TRUE);
INSERT INTO mesas (id_mesa, id_cliente, nombre_mesa) VALUES (1, 1, 'Mesa 1'), (2, 1, 'Mesa 2');
INSERT INTO productos (id_producto, nombre, descripcion, precio, stock, maneja_inventario) VALUES
(1, 'Cono de Helado', 'Helado con sabores a elección', 5000.00, NULL, FALSE),
(2, 'Agua Botella 500ml', 'Agua natural', 2000.00, 100, TRUE);
INSERT INTO adiciones_producto (id_adicion, id_producto, nombre, precio_extra) VALUES
(1, 1, 'Topping de chocolate', 1000.00),
(2, 1, 'Chispas de colores', 800.00);

INSERT INTO pedidos (id_pedido, id_cliente, id_usuario, id_mesa, tipo_pedido) VALUES (1, 1, 1, 1, 'en_mesa');
INSERT INTO detalle_pedido (id_detalle_pedido, id_pedido, id_producto, cantidad, precio_unitario) VALUES (1, 1, 1, 2, 5000.00);

INSERT INTO pedidos (id_pedido, id_cliente, id_usuario, tipo_pedido) VALUES (2, 1, 1, 'para_llevar');
INSERT INTO detalle_pedido (id_detalle_pedido, id_pedido, id_producto, cantidad, precio_unitario) VALUES (2, 2, 1, 1, 5000.00);
INSERT INTO detalle_pedido_adiciones (id_detalle_pedido_adicion, id_detalle_pedido, id_adicion, cantidad) VALUES (1, 2, 1, 1);

INSERT INTO pedidos (id_pedido, id_cliente, id_usuario, id_mesa, tipo_pedido) VALUES (3, 1, 1, 2, 'en_mesa');
INSERT INTO detalle_pedido (id_detalle_pedido, id_pedido, id_producto, cantidad, precio_unitario, descuento) VALUES (3, 3, 2, 1, 2000.00, 500.00);
