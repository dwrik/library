let books = [
    {
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        pages: 599,
        published: 1997,
        read: true,
    },
    {
        title: 'Sherlock Holmes',
        author: 'Sir Arthur Conan Doyle',
        pages: 879,
        published: 1892,
        read: false,
    },
    {
        title: 'Digital Fortress',
        author: 'Dan Brown',
        pages: 389,
        published: 1998,
        read: false,
    },
];

const modal = document.querySelector('.modal');
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        hideModal(event);
    }
});

const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', (event) => {
    modal.style.display = 'block';
});

const cancelButton = document.querySelector('#modal-cancel');
cancelButton.addEventListener('click', hideModal);

const saveButton = document.querySelector('#modal-confirm');
saveButton.addEventListener('click', addBookToLibrary);


// helper
function hideModal(event) {
    modal.style.display = 'none';
}

// constructor function
function Book(title, author, pages, published, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.published = published;
    this.read = read;
}

function addBookToLibrary(event) {
}

function displayBooks() {
    const cardContainer = document.querySelector('.card-container');
    for (let index in books) {
        const book = books[index];
        const card = getCard(
            book.title,
            book.author,
            book.pages,
            book.published,
            book.read);
        cardContainer.appendChild(card);
    }
}

function getCard(title, author, pages, published, read) {
    const card = getElement('div', '', 'card');
    const cardTitle = getElement('div', title, 'card-title');
    const cardPages = getElement('p', `Pages: ${pages}`, 'card-content');
    const cardAuthor = getElement('p', `Author: ${author}`, 'card-content');
    const cardRemove = getElement('span', '&times;', 'card-remove');
    const cardPublished = getElement('p', `Published: ${published}`, 'card-content');
    const cardDescription = getElement('div', '', 'card-description');
    const cardRead = getElement('div', 'Read', 'card-read');
    if (read) {
        cardRead.style.backgroundColor = 'salmon';
    }
    cardDescription.appendChild(cardAuthor);
    cardDescription.appendChild(cardPages);
    cardDescription.appendChild(cardPublished);
    card.appendChild(cardRemove);
    card.appendChild(cardTitle);
    card.appendChild(cardDescription);
    card.appendChild(cardRead);
    return card;
}

/*
<div class="card">
    <span class="card-remove">&times;</span>
    <div class="card-title">Sherlock Holmes</div>
    <div class="card-description">
        <p class="card-content">Author: Sir Arthur Conan Doyle</p>
        <p class="card-content">Pages: 678</p>
        <p class="card-content">Published: 2009</p>
    </div>
    <div class="card-read">Read</div>
</div>
*/

// div creator helper
function getElement(element, text, ...classes) {
    const newElement = document.createElement(element);
    newElement.innerHTML = text;
    for (let index in classes) {
        newElement.classList.add(classes[index]);
    }
    return newElement;
}

displayBooks();