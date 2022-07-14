let addBookButton = document.querySelector('#addBook')
const closeBookButton = document.querySelector('#closeBook')

addBookButton.addEventListener('click', () => toggleOverlay())
closeBookButton.addEventListener('click', () => toggleOverlay())


function toggleOverlay() {
    let overlayDiv = document.querySelector(".overlay");
    if (overlayDiv.style.opacity === '0'){
    overlayDiv.style.opacity = 1;
    overlayDiv.style.zIndex = 5;
    overlayDiv.style.transform = "none";
    } else {
    overlayDiv.style.opacity = 0;
    overlayDiv.style.zIndex = -5;
    overlayDiv.style.transform = "translate(-50%,-50%) scale(0)";
};
};


let myLibrary = [];

function Book(title,author,pages,read,index) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.index = index
};

// Button to add form to library
let formSubmit = document.querySelector('#formSubmit');
formSubmit.addEventListener('click', () => {
    let form = document.querySelector('form');
    addBookToLibrary(form);
    toggleOverlay();
    document.getElementById("addBookForm").reset();
});


function addBookToLibrary(form) {
    let title = form.bookTitle.value
    let author = form.bookAuthor.value
    let pages = form.bookPages.value
    let read = form.isRead.checked
    if (read === true){
        read = 'Yes'
    } else{
        read = 'No'
    };

    let newBook = new Book(title,author,pages,read,myLibrary.length);
    myLibrary.push(newBook);
    display();
};

let clearCardsContainer = ()=>{
    let cardsContainer = document.querySelector('.cardsContainer')
    cardsContainer.innerHTML = ""
};

function display(){
    clearCardsContainer()
myLibrary.forEach(function(book) {
    let cardsContainer = document.querySelector('.cardsContainer')
    let card = document.createElement('div')
    card.classList.add('card')
    let title = document.createElement('div')
    title.classList.add('title')
    let author = document.createElement('div')
    author.classList.add('author')
    let pages = document.createElement('div')
    pages.classList.add('pages')
    let read = document.createElement('button')
    read.classList.add('read')
    let deleteButton = document.createElement('button')
    deleteButton.classList.add('delete')
    
    card.setAttribute('id',`${book.index}`)
    title.textContent = `${book.title}`
    author.textContent = `${book.author}`
    pages.textContent = `${book.pages}`
    read.textContent = `${book.read}`
    if (book.read === 'Yes'){
        read.classList.add('yesRead')
    } else{
        read.classList.add('notRead')
    };
    deleteButton.textContent = `Delete`

    deleteButton.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(book),1)
        display()
    });

    read.addEventListener('click', () =>{
        if (read.classList.contains('yesRead')){
            read.classList.remove('yesRead')
            read.classList.add('notRead')
            read.textContent = 'No'
        } else {
            read.classList.remove('notRead')
            read.classList.add('yesRead')
            read.textContent = 'Yes'
        }
    })

    card.appendChild(title)
    card.appendChild(author)
    card.appendChild(pages)
    card.appendChild(read)
    card.appendChild(deleteButton)

    cardsContainer.appendChild(card)
    });
};
