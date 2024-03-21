"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SistemaBiblioteca = void 0;
var leitor = require("readline-sync");
var db_1 = require("./db");
var Livro = /** @class */ (function () {
    function Livro(titulo, autor, anoPublicacao, quantidadeDisponivel, paginas) {
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.quantidadeDisponivel = quantidadeDisponivel;
        this.paginas = paginas;
    }
    return Livro;
}());
var Usuario = /** @class */ (function () {
    function Usuario(nome, email) {
        this.nome = nome;
        this.email = email;
    }
    return Usuario;
}());
var SistemaBiblioteca = /** @class */ (function () {
    function SistemaBiblioteca() {
        this.usuarios = [];
        this.livros = [];
    }
    SistemaBiblioteca.prototype.cadastrarLivros = function () {
        var titulo = leitor.question("Informe o título: ");
        var autor = leitor.question("Informe o leitor: ");
        var anoPublicacao = leitor.question("Informe o ano de publicação: ");
        var quantidadeDisponivel = leitor.question("Informe a quantidade disponível: ");
        var paginas = leitor.question("Informe o numero de paginas: ");
        var livro = new Livro(titulo, autor, anoPublicacao, quantidadeDisponivel, paginas);
        this.criarLivroBanco(livro);
    };
    SistemaBiblioteca.prototype.criarLivroBanco = function (livro) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, executeDatabaseQuery("\n                INSERT INTO Livros (titulo, autor, anoPulicacao, quantidadeDisponivel, paginas) VALUES (?, ?, ?, ?, ?);\n            ", [livro.titulo, livro.autor, livro.anoPublicacao, livro.quantidadeDisponivel, livro.paginas])];
                    case 1:
                        _a.sent();
                        console.log("\n Livro: ".concat(livro.titulo, " cadastrado com sucesso"));
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log("Erro:", e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SistemaBiblioteca.prototype.cadastrarUsuarios = function () {
        var nome = leitor.question("Informe o nome do usuário: ");
        var email = leitor.question("Informe o email do usuário: ");
        var usuario = new Usuario(nome, email);
        this.criarUsuarioBanco(usuario);
    };
    SistemaBiblioteca.prototype.criarUsuarioBanco = function (usuario) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    executeDatabaseQuery("\n            INSERT INTO Usuarios (nome, email) VALUES (?, ?);\n            ", [usuario.nome, usuario.email]);
                    console.log("\n Usu\u00E1rio: ".concat(usuario.nome, " cadastrado com sucesso"));
                }
                catch (e) {
                    console.log("Erro:", e);
                }
                return [2 /*return*/];
            });
        });
    };
    SistemaBiblioteca.prototype.emprestarLivros = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id_usuario, id_livro, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usuariosBanco()];
                    case 1:
                        _a.sent();
                        id_usuario = leitor.question("Insira o id do usuário: ");
                        return [4 /*yield*/, this.livrosBanco()];
                    case 2:
                        _a.sent();
                        id_livro = leitor.question("Insira o id do livro: ");
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, , 7]);
                        //inserir o emprestimo de livros
                        return [4 /*yield*/, executeDatabaseQuery("INSERT INTO sistemaBiblioteca (id_usuario, id_livro) VALUES (?, ?);", [id_usuario, id_livro])
                            //atualizar a quantidade disponivel de livros
                        ];
                    case 4:
                        //inserir o emprestimo de livros
                        _a.sent();
                        //atualizar a quantidade disponivel de livros
                        return [4 /*yield*/, executeDatabaseQuery("UPDATE livros SET quantidadeDisponivel = quantidadeDisponivel - 1 WHERE id_livro = ?;", [id_livro])];
                    case 5:
                        //atualizar a quantidade disponivel de livros
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_2 = _a.sent();
                        console.log("Error:", e_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SistemaBiblioteca.prototype.devolverLivro = function () {
        return __awaiter(this, void 0, void 0, function () {
            var idEmprestimo, _a, _b, e_3, idLivro, e_4, e_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.emprestimosBancos()];
                    case 1:
                        _c.sent();
                        idEmprestimo = leitor.question("Qual id do emprestimo a ser deletado? ");
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        _b = (_a = console).log;
                        return [4 /*yield*/, executeDatabaseQuery("SELECT id_livro FROM sistemaBiblioteca WHERE id_biblioteca= ?", [idEmprestimo])];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 5];
                    case 4:
                        e_3 = _c.sent();
                        console.log("Error:", e_3);
                        return [3 /*break*/, 5];
                    case 5:
                        idLivro = leitor.question("Informe o id do livro para confirmar: ");
                        _c.label = 6;
                    case 6:
                        _c.trys.push([6, 8, , 9]);
                        //deletar dos dados de emprestimo
                        return [4 /*yield*/, executeDatabaseQuery("DELETE FROM sistemaBiblioteca WHERE id_biblioteca =?;", [idEmprestimo])];
                    case 7:
                        //deletar dos dados de emprestimo
                        _c.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        e_4 = _c.sent();
                        console.log("Error:", e_4);
                        return [3 /*break*/, 9];
                    case 9:
                        _c.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, executeDatabaseQuery("UPDATE livros SET quantidadeDisponivel = quantidadeDisponivel + 1 \n                WHERE id_livro = ?", [idLivro])];
                    case 10:
                        _c.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        e_5 = _c.sent();
                        console.log("Error:", e_5);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    SistemaBiblioteca.prototype.deletarUsuario = function () {
        return __awaiter(this, void 0, void 0, function () {
            var idUsuario, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usuariosBanco()];
                    case 1:
                        _a.sent();
                        idUsuario = leitor.question("Qual id do usuario a ser deletado? ");
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        //deletar dos dados de emprestimo
                        return [4 /*yield*/, executeDatabaseQuery("DELETE FROM usuarios WHERE id_usuario =?;", [idUsuario])];
                    case 3:
                        //deletar dos dados de emprestimo
                        _a.sent();
                        console.log("O usuário foi deletado com sucesso!");
                        return [3 /*break*/, 5];
                    case 4:
                        e_6 = _a.sent();
                        console.log("Error:", e_6);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SistemaBiblioteca.prototype.deletarLivro = function () {
        return __awaiter(this, void 0, void 0, function () {
            var idLivro, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usuariosBanco()];
                    case 1:
                        _a.sent();
                        idLivro = leitor.question("Qual id do livro a ser deletado? ");
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        //deletar dos dados de emprestimo
                        return [4 /*yield*/, executeDatabaseQuery("DELETE FROM livros WHERE id_livro =?;", [idLivro])];
                    case 3:
                        //deletar dos dados de emprestimo
                        _a.sent();
                        console.log("O usuário foi deletado com sucesso!");
                        return [3 /*break*/, 5];
                    case 4:
                        e_7 = _a.sent();
                        console.log("Error:", e_7);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //getters  
    SistemaBiblioteca.prototype.livrosBanco = function () {
        return __awaiter(this, void 0, void 0, function () {
            var livros, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, executeDatabaseQuery("SELECT * FROM livros;", [])];
                    case 1:
                        livros = _a.sent();
                        console.log("Base de dados dos livros: ");
                        return [2 /*return*/, livros.foreach(function (_a) {
                                var id_livro = _a.id_livro, titulo = _a.titulo, autor = _a.autor, anoPublicacao = _a.anoPublicacao, quantidadeDisponivel = _a.quantidadeDisponivel, paginas = _a.paginas;
                                console.log("ID: ".concat(id_livro, " | TITULO: ").concat(titulo, " | AUTOR: ").concat(autor, " | ANO PUBLICA\u00C7\u00C3O: ").concat(anoPublicacao, " | QUANTIDADE DISPONIVEL: ").concat(quantidadeDisponivel, " | PAGINAS: ").concat(paginas));
                            })];
                    case 2:
                        e_8 = _a.sent();
                        console.log("Error", e_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SistemaBiblioteca.prototype.usuariosBanco = function () {
        return __awaiter(this, void 0, void 0, function () {
            var livros, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, executeDatabaseQuery("SELECT * FROM usuarios;", [])];
                    case 1:
                        livros = _a.sent();
                        console.log("Base de dados dos usuarios: ");
                        return [2 /*return*/, livros.foreach(function (_a) {
                                var id_usuario = _a.id_usuario, nome = _a.nome, email = _a.email;
                                console.log("ID: ".concat(id_usuario, " | NOME: ").concat(nome, " | EMAIL: ").concat(email));
                            })];
                    case 2:
                        e_9 = _a.sent();
                        console.log("Error", e_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SistemaBiblioteca.prototype.emprestimosBancos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var emprestimos, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, executeDatabaseQuery("SELECT sistemaBiblioteca.id_biblioteca, u.nome, l.titulo FROM sistemaBiblioteca\n                INNER JOIN usuarios as u\n                ON u.id_usuarios = sistemaBiblioteca.id_usuario\n                INNER JOIN livros as l\n                ON l.id_livros = sistemaBiblioteca.id_livro;", [])];
                    case 1:
                        emprestimos = _a.sent();
                        console.log("Base de dados dos emprestimos: ");
                        return [2 /*return*/, emprestimos.foreach(function (_a) {
                                var id_biblioteca = _a.id_biblioteca, nome = _a.nome, titulo = _a.titulo;
                                console.log("ID: ".concat(id_biblioteca, " | NOME: ").concat(nome, " | TITULO: ").concat(titulo));
                            })];
                    case 2:
                        e_10 = _a.sent();
                        console.log("Error", e_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return SistemaBiblioteca;
}());
exports.SistemaBiblioteca = SistemaBiblioteca;
function executeDatabaseQuery(query, params) {
    return __awaiter(this, void 0, void 0, function () {
        var result, e_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.default.execute(query, params)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    e_11 = _a.sent();
                    console.log("Erro:", e_11);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
