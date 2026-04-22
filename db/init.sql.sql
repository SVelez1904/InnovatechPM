-- 1. LIMPIEZA (El orden importa: primero las tablas con FK, luego las maestras)
DROP TABLE IF EXISTS proyecto_usuarios;
DROP TABLE IF EXISTS proyecto;
DROP TABLE IF EXISTS estados_proyecto;

-- Borramos también las secuencias para que los contadores vuelvan a 100
DROP SEQUENCE IF EXISTS seq_proyecto_usuarios;
DROP SEQUENCE IF EXISTS seq_proyectos;
DROP SEQUENCE IF EXISTS seq_estados_proyecto;

-- 2. CREACIÓN DE SECUENCIAS
CREATE SEQUENCE seq_estados_proyecto START WITH 100;
CREATE SEQUENCE seq_proyectos START WITH 100;
CREATE SEQUENCE seq_proyecto_usuarios START WITH 100;

-- 3. TABLAS
CREATE TABLE estados_proyecto (
    id INTEGER PRIMARY KEY DEFAULT nextval('seq_estados_proyecto'),
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE proyecto (
    id INTEGER PRIMARY KEY DEFAULT nextval('seq_proyectos'),
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    slug VARCHAR(120) UNIQUE,
    fecha_inicio DATE NOT NULL,
    fecha_entrega_estimada DATE,
    fecha_fin_real DATE,
    presupuesto DECIMAL(12, 2) DEFAULT 0.00,
    prioridad VARCHAR(20) DEFAULT 'MEDIA',
    progreso_porcentaje INTEGER DEFAULT 0 CHECK (progreso_porcentaje BETWEEN 0 AND 100),
    estado_id INTEGER REFERENCES estados_proyecto(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE proyecto_usuarios (
    id INTEGER PRIMARY KEY DEFAULT nextval('seq_proyecto_usuarios'),
    proyecto_id INTEGER REFERENCES proyectos(id) ON DELETE CASCADE,
    usuario_id INTEGER NOT NULL, 
    rol_en_proyecto VARCHAR(50) DEFAULT 'CONTRIBUYENTE', 
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(proyecto_id, usuario_id)
);

-- 4. INSERTS DE PRUEBA
INSERT INTO estados_proyecto (id, nombre) VALUES (1, 'SIN_INICIAR'), (2, 'EN_PROCESO');
INSERT INTO proyecto (id, nombre, descripcion, fecha_inicio, estado_id) 
VALUES (1, 'E-commerce Granu', 'Prueba', '2026-01-01', 2);
INSERT INTO proyecto_usuarios (id, proyecto_id, usuario_id, rol_en_proyecto) VALUES (1, 1, 1, 'LIDER');

-- 5. VERIFICACIÓN (Esto abrirá la pestaña de resultados)
SELECT * FROM proyecto;
SELECT * FROM proyecto_usuarios;