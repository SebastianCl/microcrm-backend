-- 1. Agregar la columna a la tabla detalle_venta
ALTER TABLE detalle_venta
ADD COLUMN id_adicion INT NULL;

-- 2. Agregar la clave foránea (relación con adiciones_producto)
ALTER TABLE detalle_venta
ADD CONSTRAINT fk_detalle_venta_adicion
FOREIGN KEY (id_adicion) REFERENCES adiciones_producto(id_adicion);
-- Eliminar no nut de la columna
ALTER TABLE detalle_venta
ALTER COLUMN id_producto DROP NOT NULL;

-- Ajutes 26/05
-- 1. Agregar columna id_pedido a ventas
ALTER TABLE ventas
ADD COLUMN id_pedido INT;

-- 2. Crear la relación foránea hacia pedidos
ALTER TABLE ventas
ADD CONSTRAINT fk_ventas_pedidos
FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido);

-- 1. Eliminar columna actual
ALTER TABLE pedidos DROP COLUMN estado;
-- 2. Crear tabla para estados.
CREATE TABLE estado (
    id_estado SERIAL PRIMARY KEY,
    nombre_estado VARCHAR(50) NOT NULL UNIQUE
);
-- 3. Agregar estados
INSERT INTO estado (nombre_estado) VALUES
('Pendiente'),
('Preparando'),
('Entregado'),
('Cancelado'),
('Finalizado');
-- 4. Crear columna en pedidos.
ALTER TABLE pedidos
ADD COLUMN id_estado INT;
-- 5. RElacionar columna con nueva tabla
ALTER TABLE pedidos
ADD CONSTRAINT fk_pedidos_estado
FOREIGN KEY (id_estado) REFERENCES estado(id_estado)
-- 6 Actualizar los registros existentes a Pendiente. 
UPDATE pedidos SET id_estado = (
    SELECT id_estado FROM estado WHERE nombre_estado = 'Pendiente'
)
WHERE id_estado IS NULL;

-- 27/05
CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL UNIQUE
);

ALTER TABLE productos
ADD COLUMN id_categoria INT;

ALTER TABLE productos
ADD CONSTRAINT fk_productos_categoria
FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria);

INSERT INTO categorias (nombre_categoria) VALUES
('Copas'),
('Bebidas'),
('Paletas'),
('Ensaladas'),
('Malteadas');
-- 11/05
-- 1. Agregar la columna id_venta a pedidos
ALTER TABLE pedidos
ADD COLUMN id_venta INT;

-- 2. Establecer la clave foránea hacia la tabla ventas
ALTER TABLE pedidos
ADD CONSTRAINT fk_pedidos_ventas
FOREIGN KEY (id_venta) REFERENCES ventas(id_venta);
-- 24/06
-- Agregar campo observacion
ALTER TABLE pedidos
ADD COLUMN observacion TEXT;
-- Agregar campo medio_pago
ALTER TABLE pedidos
ADD COLUMN medio_pago VARCHAR(50);
--Agregar campo observacion sobre detalle pedido
ALTER TABLE detalle_pedido
ADD COLUMN observacion TEXT;
-- Gastos
CREATE TABLE tipos_gasto (
    id_tipo_gasto SERIAL PRIMARY KEY,
    nombre_tipo VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);
--Ejemplo de gastos
INSERT INTO tipos_gasto (nombre_tipo, descripcion) VALUES
('Diario', 'Gastos del día a día'),
('Insumos', 'Compra de insumos para el negocio'),
('Servicios', 'Pago de servicios como luz, agua, internet'),
('Publicidad', 'Campañas de marketing'),
('Otros', 'Otros gastos no clasificados');
-- Renombrar columna 'tipo' para eliminarla luego
ALTER TABLE gastos RENAME COLUMN tipo TO tipo_tmp;

-- Agregar columna FK al tipo de gasto
ALTER TABLE gastos ADD COLUMN id_tipo_gasto INT;

-- Agregar columna para el usuario que registró el gasto
ALTER TABLE gastos ADD COLUMN id_usuario INT;

-- Establecer las relaciones
ALTER TABLE gastos
ADD CONSTRAINT fk_tipo_gasto FOREIGN KEY (id_tipo_gasto) REFERENCES tipos_gasto(id_tipo_gasto),
ADD CONSTRAINT fk_usuario_gasto FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);

-- Asignar tipo basado en texto antiguo
UPDATE gastos
SET id_tipo_gasto = (
    SELECT id_tipo_gasto 
    FROM tipos_gasto 
    WHERE LOWER(nombre_tipo) = LOWER(tipo_tmp::text)
)
WHERE tipo_tmp IS NOT NULL;

-- Eliminar columna temporal
ALTER TABLE gastos DROP COLUMN tipo_tmp;

-- Act 13/07
ALTER TABLE pedidos
ADD COLUMN valor_domi NUMERIC(10,2) DEFAULT 0,
ADD COLUMN valor_descu NUMERIC(10,2) DEFAULT 

-- ACT 02/08
--Eliminar TRG de ventas_detalle, esta dando conflictos de inventarios. 