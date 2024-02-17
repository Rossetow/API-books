const bookForm = document.getElementById("book-form")
const bookList = document.getElementById("book-list")

let tbody = document.createElement('tbody')
tbody.setAttribute('id', 'tbody')


function listBooks (){
    fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(tbody.innerHTML = '')
    .then(data => {
        data.forEach(book => {
            const tr = document.createElement('tr')
            const th = document.createElement('th')
            const tdTitle = document.createElement('td')
            const tdAuthor = document.createElement('td')
            const tdPages = document.createElement('td')
            const tdEdition = document.createElement('td')
            const tdAvaible = document.createElement('td')
            const tdHolder = document.createElement('td')
            const tdCover = document.createElement('td')
            const tdButton = document.createElement('td')

            th.setAttribute('scope', 'row')

            // const avaibleCheck = document.createElement('input')
            // avaibleCheck.setAttribute('type', 'checkbox')
            // avaibleCheck.setAttribute('class', 'form-check-input')
            let avaible = "Yes"
            if(book.avaible === false)
                avaible="No"


            th.innerHTML = book.id

            tdTitle.innerHTML = book.title
            tdAuthor.innerHTML = book.author
            tdPages.innerHTML = book.pages
            tdEdition.innerHTML = book.edition
            tdAvaible.innerHTML = avaible
            tdHolder.innerHTML = book.holder

            const imgCover = document.createElement('img')
            imgCover.setAttribute('id', 'img-'+book.id)
            imgCover.setAttribute('src', book.cover)
            tdCover.appendChild(imgCover)

            // li.innerHTML = `Title - ${book.title}  |  Author - ${book.author}  |  Pages - ${book.pages}  |  Edition - ${book.edition}  |  Avaible - ${avaible}  |  Holder - ${book.holder}  |`

            const deleteButton = document.createElement('button')
            deleteButton.setAttribute('class', "btn btn-danger")
            deleteButton.textContent = 'Delete'
            deleteButton.addEventListener('click', ()=> deleteBook(book.id))
            tdButton.appendChild(deleteButton)

            tr.appendChild(th)
            tr.appendChild(tdTitle)
            tr.appendChild(tdAuthor)
            tr.appendChild(tdPages)
            tr.appendChild(tdEdition)
            tr.appendChild(tdAvaible)
            tr.appendChild(tdHolder)
            tr.appendChild(tdCover)
            tr.appendChild(tdButton)

            tbody.appendChild(tr)
        })
    })
    .then(bookList.appendChild(tbody))
    .catch(error => console.log('Err0', error));
}

listBooks()

function deleteBook (id){
    fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE',
    })
    .then(listBooks())
    .catch(error => console.log('Error:' + error))
}



bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log(document.getElementById('cover'))

    const title = document.getElementById("title").value
    const author = document.getElementById("author").value
    const pages = parseInt(document.getElementById("pages").value)
    const edition = document.getElementById("edition").value
    const cover = document.getElementById("cover").value
    const avaible = true
    const holder = ""
    fetch('http://localhost:3000/books', {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: null, title: title, author: author, pages: pages, edition: edition, avaible: avaible, holder: holder, cover: cover
            }),
    })
    .then(response => response.json())
    .then(() => {
        listBooks();
        bookForm.reset();
    })
    .catch(error => console.log('Error:' + error))
})
