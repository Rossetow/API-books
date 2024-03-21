import { SistemaBiblioteca } from "./Classes";
import * as leitor from "readline-sync"

main()

async function main() {
    while (true) {

        const biblioteca = new SistemaBiblioteca();

        console.log('SEJA BEM VIND@ AO SISTEMA DE BIBLIOTECA :>');
        console.log('1 - CADASTRAR LIVRO');
        console.log('2 - CADASTRAR USUÁRIO');
        console.log('3 - EMPRESTAR LIVRO');
        console.log('4 - DEVOLVER LIVRO');
        console.log('5 - LIVROS DISPONIVEIS');
        console.log('6 - DELETAR USUARIO');
        console.log('7 - DELETAR LIVRO');
        console.log('0 - SAIR');


        let opcao = leitor.questionInt("Informe a opcao desejada")

        switch (opcao) {
            case 1:
                await biblioteca.cadastrarLivros
                break;

            case 2:
                await biblioteca.cadastrarUsuarios
                break;

            case 3:
                await biblioteca.emprestarLivros
                break;

            case 4:
                await biblioteca.devolverLivro
                break;

            case 5:
                await biblioteca.livrosBanco
                break;

            case 6:
                await biblioteca.deletarUsuario
                break;

            case 7:
                await biblioteca.deletarLivro
                break;

            case 0:
                console.log("SAINDO...");
                process.exit(0)

            default:
                console.log("Opçao invalida")
                break;

        }

    }
}