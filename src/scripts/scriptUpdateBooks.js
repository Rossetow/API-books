
const bookForm = document.getElementById("book-form")
const bookList = document.getElementById("book-list")

let tbody = document.createElement('tbody')
tbody.setAttribute('id', 'tbody')



function listBooks(){
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


            tdTitle.setAttribute('id', `title-${book.id}`)
            tdAuthor.setAttribute('id', `author-${book.id}`)
            tdPages.setAttribute('id', `pages-${book.id}`)
            tdEdition.setAttribute('id', `edition-${book.id}`)
            tdAvaible.setAttribute('id', `avaible-${book.id}`)
            tdHolder.setAttribute('id', `holder-${book.id}`)
            tdCover.setAttribute('id', `cover-${book.id}`)


            // li.innerHTML = `Title - ${book.title}  |  Author - ${book.author}  |  Pages - ${book.pages}  |  Edition - ${book.edition}  |  Avaible - ${avaible}  |  Holder - ${book.holder}  |`

            const deleteButton = document.createElement('button')
            deleteButton.setAttribute('class', "btn btn-primary")
            deleteButton.textContent = 'Edit'
            deleteButton.addEventListener('click', ()=> setEditForm(book.id))
            tdButton.appendChild(deleteButton)

            const imgCover = document.createElement('img')
            imgCover.setAttribute('id', 'img-'+book.id)
            imgCover.setAttribute('src', book.cover)
            tdCover.appendChild(imgCover)

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
    .catch(error => console.log('Erro', error));
}



function saveBook(){


    let id = parseInt(document.getElementById('id').value)
    
    console.log(id)
    console.log('oi')

    let titlePut = document.getElementById('title').value
    let authorPut = document.getElementById('author').value
    let pagesPut = document.getElementById('pages').value
    let editionPut = document.getElementById('edition').value
    let avaiblePut = document.getElementById('avaible').checked
    let holderPut = document.getElementById('holder').value
    let coverPut = document.getElementById('cover').value

    console.log(avaiblePut.checked)

    fetch(`http://localhost:3000/books/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title: titlePut, author: authorPut, pages: pagesPut, edition: editionPut, avaible: avaiblePut, holder: holderPut, cover: coverPut
        }),
    })
    .then(() => listBooks())
    .catch(error => console.log('Error:' + error))
}

function setEditForm(id){

    document.getElementById('id').value = id
    document.getElementById('title').value = document.getElementById('title-' + id).innerHTML
    document.getElementById('author').value = document.getElementById('author-' + id).innerHTML
    document.getElementById('pages').value = document.getElementById('pages-' + id).innerHTML
    document.getElementById('author').value = document.getElementById('author-' + id).innerHTML
    document.getElementById('edition').value = document.getElementById('edition-' + id).innerHTML
    document.getElementById('cover').value = document.getElementById('img-' + id).getAttribute('src')

    if(document.getElementById('avaible-'+id).innerHTML === "Yes"){
        console.log("oi")
        document.getElementById('avaible').checked = true
    } else {
        document.getElementById('avaible').checked = false
    }

    document.getElementById('holder').value = document.getElementById('holder-' + id).innerHTML
}

listBooks()