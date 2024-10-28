CREATE DATABASE IF NOT EXISTS Biblioteca;
USE Biblioteca;

CREATE TABLE IF NOT EXISTS Libros (
    ISBN CHAR(4) PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    NumeroPaginas INT NOT NULL,
    CantidadDisponible INT DEFAULT 1 CHECK (CantidadDisponible >= 0)
);

CREATE TABLE IF NOT EXISTS Usuarios (
    Identificador INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Apellidos VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Prestamos (
    Libro CHAR(4),
    Usuario INT,
    FechaPrestamo DATE NOT NULL,
    FechaLimiteDevolucion DATE NOT NULL,
    FechaRealDevolucion DATE,
    Cargos DECIMAL(10, 2) DEFAULT 0.00,
    PRIMARY KEY (Libro, Usuario, FechaPrestamo),
    FOREIGN KEY (Libro) REFERENCES Libros(ISBN),
    FOREIGN KEY (Usuario) REFERENCES Usuarios(Identificador)
);

DELIMITER $$
CREATE PROCEDURE SP_CREATE_LIBRO(
	IN ISBN CHAR(4),
    IN Nombre VARCHAR(255),
    IN NumeroPaginas INT
)
BEGIN
    INSERT INTO Libros (ISBN, Nombre, NumeroPaginas) 
	VALUES (ISBN, Nombre, NumeroPaginas);
	COMMIT;
END$$

CREATE PROCEDURE SP_REMOVE_LIBRO(
	IN ISBN_INPUT CHAR(4)
)
BEGIN
	DELETE FROM Libros WHERE ISBN=ISBN_INPUT;
END$$

CREATE PROCEDURE SP_UPDATE_LIBRO(
	IN ISBN_INPUT CHAR(4),
	IN NombreInput VARCHAR(255),
    IN NumeroPaginasInput INT
)
BEGIN
	UPDATE Libros SET Nombre=NombreInput, NumeroPaginas=NumeroPaginasInput WHERE ISBN = ISBN_INPUT;
    COMMIT;
END$$
DELIMITER ;


CALL SP_CREATE_LIBRO(
	'0001',
    'Harry Potter y la cama',
    '666'
);

#CALL SP_REMOVE_LIBRO(
#	'0001'
#);

INSERT INTO Libros (ISBN, Nombre, NumeroPaginas, CantidadDisponible) VALUES
('0006', 'Cien años de soledad', 417, 5),
('0002', '1984', 328, 3),
('0003', 'Don Quijote de la Mancha', 863, 2),
('0004', 'Matar a un ruiseñor', 281, 4),
('0005', 'El principito', 96, 6);