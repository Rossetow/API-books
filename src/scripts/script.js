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

            const editButton = document.createElement('button')
            editButton.setAttribute('class', "btn btn-primary")
            editButton.textContent = 'Edit'
            editButton.addEventListener('click', ()=> openModal(book))
            tdButton.appendChild(editButton)

            tdTitle.setAttribute('id', `title-${book.id}`)
            tdAuthor.setAttribute('id', `author-${book.id}`)
            tdPages.setAttribute('id', `pages-${book.id}`)
            tdEdition.setAttribute('id', `edition-${book.id}`)
            tdAvaible.setAttribute('id', `avaible-${book.id}`)
            tdHolder.setAttribute('id', `holder-${book.id}`)
            tdCover.setAttribute('id', `cover-${book.id}`)


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
    const cover = document.getElementById('cover').value
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
  

function openModal(book){
  document.getElementById('modal-container').style.display = 'flex'
  setEditForm(book.id)
}

function closeModal(){
  document.getElementById('modal-container').style.display = 'none'

}

function setEditForm(id){

  document.getElementById('id-edit').value = id
  document.getElementById('title-edit').value = document.getElementById('title-' + id).innerHTML
  document.getElementById('author-edit').value = document.getElementById('author-' + id).innerHTML
  document.getElementById('pages-edit').value = document.getElementById('pages-' + id).innerHTML
  document.getElementById('author-edit').value = document.getElementById('author-' + id).innerHTML
  document.getElementById('edition-edit').value = document.getElementById('edition-' + id).innerHTML
  document.getElementById('cover-edit').value = document.getElementById('img-' + id).getAttribute('src')

  if(document.getElementById('avaible-'+id).innerHTML === "Yes"){
      console.log("oi")
      document.getElementById('avaible-edit').checked = true
  } else {
      document.getElementById('avaible-edit').checked = false
  }

  document.getElementById('holder-edit').value = document.getElementById('holder-' + id).innerHTML
}

function saveBook(){


  let id = parseInt(document.getElementById('id-edit').value)
  
  console.log(id)
  console.log('oi')

  let titlePut = document.getElementById('title-edit').value
  let authorPut = document.getElementById('author-edit').value
  let pagesPut = document.getElementById('pages-edit').value
  let editionPut = document.getElementById('edition-edit').value
  let avaiblePut = document.getElementById('avaible-edit').checked
  let holderPut = document.getElementById('holder-edit').value
  let coverPut = document.getElementById('cover-edit').value

  console.log(avaiblePut.checked)

  fetch(`http://localhost:3000/books/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({title: titlePut, author: authorPut, pages: pagesPut, edition: editionPut, avaible: avaiblePut, holder: holderPut, cover: coverPut
      }),
  })
  .then(()=>closeModal())
  .then(() => listBooks())
  .catch(error => console.log('Error:' + error))
}