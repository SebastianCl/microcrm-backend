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