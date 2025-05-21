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
