const data = require('./controllers/data/data.json')
const express = require('express')
const fs = require('fs')

const server = express()
server.use(express.json())

const cors = require('cors')

server.use(cors())

server.listen(3000, () => {
    console.log('O server está online')
})

server.post('/books', (req, res) => {
    const newBook = req.body

    if(!newBook.title || !newBook.author || newBook.pages<=0 || !newBook.edition){
        return res.status(400).json({message: "Invalid book, check informations"})
    } else {
        newBook.id = data.Books.length +1
        data.Books.push(newBook)
        saveData(data)

        return res.status(201).json({message: "Books saved successfully!"})
    }
})

server.get('/books', (req, res) => {
    return res.json(data.Books)
})

server.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id)
    const modifyBook = req.body
    const indexBook = data.Books.findIndex(book => book.id === bookId)
    console.log("chegou aqui")

    console.log(modifyBook)
    if(indexBook === -1)
        return res.status(404).json({message: "Book not found"})

    data.Books[indexBook].id = modifyBook.id || data.Books[indexBook].id

    data.Books[indexBook].title = modifyBook.title || data.Books[indexBook].title

    data.Books[indexBook].author = modifyBook.author || data.Books[indexBook].author

    data.Books[indexBook].pages = modifyBook.pages || data.Books[indexBook].pages

    data.Books[indexBook].edition = modifyBook.edition || data.Books[indexBook].edition

    data.Books[indexBook].avaible = modifyBook.avaible 
    
    data.Books[indexBook].holder = modifyBook.holder || data.Books[indexBook].holder

    saveData(data)
    return res.json({message: "Book updated successfully"})
})

server.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id)

    data.Books = data.Books.filter(b => b.id !== id)

    saveData(data)
    return res.status(200).json({message: "Book deleted with success"})
})

function saveData(){
    fs.writeFileSync(__dirname + '/controllers/data/data.json', JSON.stringify(data, null, 2))
}