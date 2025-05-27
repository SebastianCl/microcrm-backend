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