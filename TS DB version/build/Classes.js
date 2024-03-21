"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SistemaBiblioteca = void 0;
const leitor = __importStar(require("readline-sync"));
const db_1 = __importDefault(require("./db"));
class Livro {
    constructor(titulo, autor, anoPublicacao, quantidadeDisponivel, paginas) {
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.quantidadeDisponivel = quantidadeDisponivel;
        this.paginas = paginas;
    }
}
class Usuario {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
}
class SistemaBiblioteca {
    constructor() {
        this.usuarios = [];
        this.livros = [];
    }
    cadastrarLivros() {
        let titulo = leitor.question("Informe o título: ");
        let autor = leitor.question("Informe o leitor: ");
        let anoPublicacao = leitor.questionInt("Informe o ano de publicação: ");
        let quantidadeDisponivel = leitor.questionInt("Informe a quantidade disponível: ");
        let paginas = leitor.questionInt("Informe o numero de paginas: ");
        let livro = new Livro(titulo, autor, anoPublicacao, quantidadeDisponivel, paginas);
        this.criarLivroBanco(livro);
    }
    criarLivroBanco(livro) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield executeDatabaseQuery(`
                INSERT INTO Livros (titulo, autor, anoPulicacao, quantidadeDisponivel, paginas) VALUES (?, ?, ?, ?, ?);
            `, [livro.titulo, livro.autor, livro.anoPublicacao, livro.quantidadeDisponivel, livro.paginas]);
                console.log(`\n Livro: ${livro.titulo} cadastrado com sucesso`);
            }
            catch (e) {
                console.log("Erro:", e);
            }
        });
    }
    cadastrarUsuarios() {
        let nome = leitor.question("Informe o nome do usuário: ");
        let email = leitor.question("Informe o email do usuário: ");
        let usuario = new Usuario(nome, email);
        this.criarUsuarioBanco(usuario);
    }
    criarUsuarioBanco(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                executeDatabaseQuery(`
            INSERT INTO Usuarios (nome, email) VALUES (?, ?);
            `, [usuario.nome, usuario.email]);
                console.log(`\n Usuário: ${usuario.nome} cadastrado com sucesso`);
            }
            catch (e) {
                console.log("Erro:", e);
            }
        });
    }
    emprestarLivros() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usuariosBanco();
            let id_usuario = leitor.question("Insira o id do usuário: ");
            yield this.livrosBanco();
            let id_livro = leitor.question("Insira o id do livro: ");
            try {
                yield executeDatabaseQuery(`INSERT INTO sistemaBiblioteca (id_usuario, id_livro) VALUES (?, ?);`, [id_usuario, id_livro]);
                yield executeDatabaseQuery(`UPDATE livros SET quantidadeDisponivel = quantidadeDisponivel - 1 WHERE id_livro = ?;`, [id_livro]);
            }
            catch (e) {
                console.log("Error:", e);
            }
        });
    }
    devolverLivro() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.emprestimosBancos();
            let idEmprestimo = leitor.question("Qual id do emprestimo a ser deletado? ");
            try {
                console.log(yield executeDatabaseQuery(`SELECT id_livro FROM sistemaBiblioteca WHERE id_biblioteca= ?`, [idEmprestimo]));
            }
            catch (e) {
                console.log("Error:", e);
            }
            let idLivro = leitor.question("Informe o id do livro para confirmar: ");
            try {
                yield executeDatabaseQuery(`DELETE FROM sistemaBiblioteca WHERE id_biblioteca =?;`, [idEmprestimo]);
            }
            catch (e) {
                console.log("Error:", e);
            }
            try {
                yield executeDatabaseQuery(`UPDATE livros SET quantidadeDisponivel = quantidadeDisponivel + 1 
                WHERE id_livro = ?`, [idLivro]);
            }
            catch (e) {
                console.log("Error:", e);
            }
        });
    }
    deletarUsuario() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usuariosBanco();
            let idUsuario = leitor.question("Qual id do usuario a ser deletado? ");
            try {
                yield executeDatabaseQuery(`DELETE FROM usuarios WHERE id_usuario =?;`, [idUsuario]);
                console.log("O usuário foi deletado com sucesso!");
            }
            catch (e) {
                console.log("Error:", e);
            }
        });
    }
    deletarLivro() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usuariosBanco();
            let idLivro = leitor.question("Qual id do livro a ser deletado? ");
            try {
                yield executeDatabaseQuery(`DELETE FROM livros WHERE id_livro =?;`, [idLivro]);
                console.log("O usuário foi deletado com sucesso!");
            }
            catch (e) {
                console.log("Error:", e);
            }
        });
    }
    livrosBanco() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livros = yield executeDatabaseQuery(`SELECT * FROM livros;`, []);
                console.log("Base de dados dos livros: ");
                return livros.foreach(({ id_livro, titulo, autor, anoPublicacao, quantidadeDisponivel, paginas }) => {
                    console.log(`ID: ${id_livro} | TITULO: ${titulo} | AUTOR: ${autor} | ANO PUBLICAÇÃO: ${anoPublicacao} | QUANTIDADE DISPONIVEL: ${quantidadeDisponivel} | PAGINAS: ${paginas}`);
                });
            }
            catch (e) {
                console.log("Error", e);
            }
        });
    }
    usuariosBanco() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livros = yield executeDatabaseQuery(`SELECT * FROM usuarios;`, []);
                console.log("Base de dados dos usuarios: ");
                return livros.foreach(({ id_usuario, nome, email }) => {
                    console.log(`ID: ${id_usuario} | NOME: ${nome} | EMAIL: ${email}`);
                });
            }
            catch (e) {
                console.log("Error", e);
            }
        });
    }
    emprestimosBancos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emprestimos = yield executeDatabaseQuery(`SELECT sistemaBiblioteca.id_biblioteca, u.nome, l.titulo FROM sistemaBiblioteca
                INNER JOIN usuarios as u
                ON u.id_usuarios = sistemaBiblioteca.id_usuario
                INNER JOIN livros as l
                ON l.id_livros = sistemaBiblioteca.id_livro;`, []);
                console.log("Base de dados dos emprestimos: ");
                return emprestimos.foreach(({ id_biblioteca, nome, titulo }) => {
                    console.log(`ID: ${id_biblioteca} | NOME: ${nome} | TITULO: ${titulo}`);
                });
            }
            catch (e) {
                console.log("Error", e);
            }
        });
    }
}
exports.SistemaBiblioteca = SistemaBiblioteca;
function executeDatabaseQuery(query, params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield db_1.default.execute(query, params);
            return result;
        }
        catch (e) {
            console.log("Erro:", e);
        }
    });
}
