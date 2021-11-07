CREATE DATABASE proyecto;

USE proyecto;

CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(16) NOT NULL,
    contrasenia VARCHAR(60) NOT NULL,
    fullname VARCHAR(150) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE links(
id INT(11) NOT NULL auto_increment,
title VARCHAR(150) NOT NULL,
url VARCHAR(255) NOT NULL,
descripcion TEXT,
user_id INT(11),
created_at timestamp NOT NULL DEFAULT current_timestamp,
PRIMARY KEY(id),
FOREIGN KEY (user_id) REFERENCES users(id)
);
