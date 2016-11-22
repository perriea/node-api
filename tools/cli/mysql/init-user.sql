# Script MySQL
CREATE USER 'node'@'localhost' IDENTIFIED BY 'nodejs';
GRANT ALL PRIVILEGES ON * . * TO 'node'@'localhost';
FLUSH PRIVILEGES;

CREATE DATABASE dev-node;