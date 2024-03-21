import * as leitor from "readline-sync"
import banco from "./db"

class Livro {
    titulo: string;
    autor: string;
    anoPublicacao: number;
    quantidadeDisponivel: number;
    paginas: number;

    constructor(titulo: string, autor: string, anoPublicacao: number, quantidadeDisponivel: number, paginas: number){
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this. quantidadeDisponivel = quantidadeDisponivel;
        this.paginas = paginas;
    }
}

class Usuario {
    nome: string;
    email: string;

    constructor(nome: string, email: string){
        this.nome = nome;
        this.email = email;
    }
}

export class SistemaBiblioteca {
    usuarios: Array<Usuario>;
    livros: Array<Livro>;

    constructor(){
        this.usuarios = [];
        this.livros = [];
    }

    cadastrarLivros(): void {
        let titulo:                 string = leitor.question("Informe o título: ")
        let autor:                  string = leitor.question("Informe o leitor: ")
        let anoPublicacao:          number = leitor.questionInt("Informe o ano de publicação: ")
        let quantidadeDisponivel:   number = leitor.questionInt("Informe a quantidade disponível: ")
        let paginas:                number = leitor.questionInt("Informe o numero de paginas: ")


        let livro: Livro = new Livro(titulo, autor, anoPublicacao, quantidadeDisponivel, paginas)

        this.criarLivroBanco(livro);
    }

    async criarLivroBanco(livro: Livro): Promise<void> {
        try {
            await executeDatabaseQuery(`
                INSERT INTO Livros (titulo, autor, anoPulicacao, quantidadeDisponivel, paginas) VALUES (?, ?, ?, ?, ?);
            `, [livro.titulo, livro.autor, livro.anoPublicacao, livro.quantidadeDisponivel, livro.paginas])
            console.log(`\n Livro: ${livro.titulo} cadastrado com sucesso`)
        } catch(e) {
            console.log("Erro:", e)
        }
    }

    cadastrarUsuarios(): void {
        let nome: string = leitor.question("Informe o nome do usuário: ")
        let email: string = leitor.question("Informe o email do usuário: ")

        let usuario: Usuario = new Usuario(nome, email)

        this.criarUsuarioBanco(usuario)
    }

    async criarUsuarioBanco(usuario: Usuario): Promise<void> { 
        try {
            executeDatabaseQuery(`
            INSERT INTO Usuarios (nome, email) VALUES (?, ?);
            `, [usuario.nome, usuario.email])
            console.log(`\n Usuário: ${usuario.nome} cadastrado com sucesso`)
        } catch (e) {
            console.log("Erro:", e)
        }
    }

    async emprestarLivros():Promise<void> {
        await this.usuariosBanco();
        let id_usuario = leitor.question("Insira o id do usuário: ")

        await this.livrosBanco();
        let id_livro = leitor.question("Insira o id do livro: ")

        try{
            //inserir o emprestimo de livros
            await executeDatabaseQuery(
                `INSERT INTO sistemaBiblioteca (id_usuario, id_livro) VALUES (?, ?);`,
                [id_usuario, id_livro]
            )

            //atualizar a quantidade disponivel de livros

            await executeDatabaseQuery(
                `UPDATE livros SET quantidadeDisponivel = quantidadeDisponivel - 1 WHERE id_livro = ?;`,
                [id_livro]
            )
        } catch (e) {
            console.log("Error:",e)
        }

    }

    async devolverLivro(): Promise<void> {
        await this.emprestimosBancos();
        let idEmprestimo = leitor.question("Qual id do emprestimo a ser deletado? ");

        try {
            console.log(
                await executeDatabaseQuery(`SELECT id_livro FROM sistemaBiblioteca WHERE id_biblioteca= ?`, [idEmprestimo])
            )
        } catch (e) {
            console.log("Error:", e)
        }

        let idLivro = leitor.question("Informe o id do livro para confirmar: ");
        
        try{
            //deletar dos dados de emprestimo
            await executeDatabaseQuery(
                `DELETE FROM sistemaBiblioteca WHERE id_biblioteca =?;`, [idEmprestimo]
            )
        } catch(e){
            console.log("Error:", e)
        }
        

        //atualizar o estoque do livro

        try {
            await executeDatabaseQuery(
                `UPDATE livros SET quantidadeDisponivel = quantidadeDisponivel + 1 
                WHERE id_livro = ?`, [idLivro]
            )
        } catch (e) {
            console.log("Error:",e)
        }
    }

    async deletarUsuario(): Promise<void> {
        await this.usuariosBanco();
        let idUsuario = leitor.question("Qual id do usuario a ser deletado? ");
        
        try{
            //deletar dos dados de emprestimo
            await executeDatabaseQuery(
                `DELETE FROM usuarios WHERE id_usuario =?;`, [idUsuario]
            )
            console.log("O usuário foi deletado com sucesso!")
        } catch(e){
            console.log("Error:", e)
        }
    }

    async deletarLivro(): Promise<void> {
        await this.usuariosBanco();
        let idLivro = leitor.question("Qual id do livro a ser deletado? ");
        
        try{
            //deletar dos dados de emprestimo
            await executeDatabaseQuery(
                `DELETE FROM livros WHERE id_livro =?;`, [idLivro]
            )
            console.log("O usuário foi deletado com sucesso!")
        } catch(e){
            console.log("Error:", e)
        }
    }

    
    //getters  
    async livrosBanco (): Promise<void>{
        try {
            const livros = await executeDatabaseQuery(
                `SELECT * FROM livros;`,
                []
            )
        console.log("Base de dados dos livros: ")
        return livros.foreach(({id_livro, titulo, autor, anoPublicacao, quantidadeDisponivel, paginas}: any) => {
            console.log(`ID: ${id_livro} | TITULO: ${titulo} | AUTOR: ${autor} | ANO PUBLICAÇÃO: ${anoPublicacao} | QUANTIDADE DISPONIVEL: ${quantidadeDisponivel} | PAGINAS: ${paginas}`)
        })
        } catch (e) {
            console.log("Error", e)
        }
    }

    async usuariosBanco (): Promise<void>{
        try {
            const livros = await executeDatabaseQuery(
                `SELECT * FROM usuarios;`,
                []
            )
        console.log("Base de dados dos usuarios: ")
        return livros.foreach(({id_usuario, nome, email}: any) => {
            console.log(`ID: ${id_usuario} | NOME: ${nome} | EMAIL: ${email}`)
        })
        } catch (e) {
            console.log("Error", e)
        }
    }

    async emprestimosBancos (): Promise<void>{
        try {
            const emprestimos = await executeDatabaseQuery(
                `SELECT sistemaBiblioteca.id_biblioteca, u.nome, l.titulo FROM sistemaBiblioteca
                INNER JOIN usuarios as u
                ON u.id_usuarios = sistemaBiblioteca.id_usuario
                INNER JOIN livros as l
                ON l.id_livros = sistemaBiblioteca.id_livro;`,
                []
            )
        console.log("Base de dados dos emprestimos: ")
        return emprestimos.foreach(({id_biblioteca, nome, titulo}: any) => {
            console.log(`ID: ${id_biblioteca} | NOME: ${nome} | TITULO: ${titulo}`)
        })
        } catch (e) {
            console.log("Error", e)
        }
    }


}

async function executeDatabaseQuery(query: string, params: any[]): Promise<any> {
    try {
        const result = await banco.execute(query, params)
        return result
    } catch (e) {
        console.log("Erro:", e)
    }
}

