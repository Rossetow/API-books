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
Object.defineProperty(exports, "__esModule", { value: true });
const Classes_1 = require("./Classes");
const leitor = __importStar(require("readline-sync"));
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const biblioteca = new Classes_1.SistemaBiblioteca();
            console.log('SEJA BEM VIND@ AO SISTEMA DE BIBLIOTECA :>');
            console.log('1 - CADASTRAR LIVRO');
            console.log('2 - CADASTRAR USUÁRIO');
            console.log('3 - EMPRESTAR LIVRO');
            console.log('4 - DEVOLVER LIVRO');
            console.log('5 - LIVROS DISPONIVEIS');
            console.log('6 - DELETAR USUARIO');
            console.log('7 - DELETAR LIVRO');
            console.log('0 - SAIR');
            let opcao = leitor.questionInt("Informe a opcao desejada");
            switch (opcao) {
                case 1:
                    yield biblioteca.cadastrarLivros;
                    break;
                case 2:
                    yield biblioteca.cadastrarUsuarios;
                    break;
                case 3:
                    yield biblioteca.emprestarLivros;
                    break;
                case 4:
                    yield biblioteca.devolverLivro;
                    break;
                case 5:
                    yield biblioteca.livrosBanco;
                    break;
                case 6:
                    yield biblioteca.deletarUsuario;
                    break;
                case 7:
                    yield biblioteca.deletarLivro;
                    break;
                case 0:
                    console.log("SAINDO...");
                    process.exit(0);
                default:
                    console.log("Opçao invalida");
                    break;
            }
        }
    });
}
