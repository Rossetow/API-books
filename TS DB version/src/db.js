"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mariadb = require("mariadb");
var banco = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'senac',
    port: '3306',
    database: 'biblioteca',
    waitForConnection: true,
    connectionLimit: 10
});
exports.default = banco;
banco.execute("\n    CREATE DATABASE IF NOT EXISTS Biblioteca\n");
banco.execute("\n    CREATE TABLE livros\n    id_livro INT AUTO_INCREMENT PRIMARY_KEY,\n    titulo VARCHAR(50) NOT NULL,\n    autor VARCHAR(50) NOT NULL,\n    anoPublicacao INT NOT NULL\n    quantidadeDisponivel INT NOT NULL,\n    paginas INT NOT NULL;\n\n");
banco.execute("\n    CREATE TABLE usuarios\n    id_usuario INR AUTO_INCREMENT PRIMARY_KEY,\n    nome VARCHAR(50) NOT NULL,\n    email VARCHAR(50) NOT NULL\n");
banco.execute("\n    CREATE TABLE sistemaBiblioteca\n    id_biblioteca INT AUTO_INCREMENT PRIMARY_KEY,\n    id_usuario INT NOT NULL,\n    id_livro INT NOT NUL,\n    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,\n    FOREIGN KEY (id_livro) REFERENCES livros(id_livro) ON DELETE CASCADE,\n");
