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

// card container reference for adding book cards
const cardContainer = document.querySelector('.card-container')

// closing modal on clicking outside modal content
const modal = document.querySelector('.modal');
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        hideModal(event);
    }
});

// add books button
const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', (event) => {
    modal.style.display = 'block';
});

// cancel modal button
const cancelButton = document.querySelector('#modal-cancel');
cancelButton.addEventListener('click', hideModal);

// save book button
const saveButton = document.querySelector('#modal-confirm');
saveButton.addEventListener('click', addBookToLibrary);

// initial call
displayBooks();


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
    let book = getBookInfo();
    let isValid = validateBookInfo(book);
    if (!isValid) {
        return;
    }
    hideModal();
    books.push(book);
    cardContainer.appendChild(getCard(book));
}

// get user input
function getBookInfo() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const published = document.querySelector('#published').value;
    const read = (document.querySelector('#read').value === 'yes')? true : false;
    return {
        title,
        author,
        pages,
        published,
        read,
    };
}

// check for empty strings
function validateBookInfo(book) {
    for (let key in book) {
        if (book[key].length === 0) {
            return false;
        }
    }
    return true;
}

// show all books as cards
function displayBooks() {
    for (let index in books) {
        const book = books[index];
        const card = getCard(book);
        cardContainer.appendChild(card);
    }
}

// card creator helper
function getCard(book) {
    const card = getElement('div', '', 'card');
    const cardTitle = getElement('div', book.title, 'card-title');
    const cardPages = getElement('p', `Pages: ${book.pages}`, 'card-content');
    const cardAuthor = getElement('p', `Author: ${book.author}`, 'card-content');
    const cardRemove = getElement('span', '&times;', 'card-remove');
    const cardPublished = getElement('p', `Published: ${book.published}`, 'card-content');
    const cardDescription = getElement('div', '', 'card-description');
    const cardRead = getElement('div', 'Read', 'card-read');
    if (book.read) {
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

// div creator helper
function getElement(element, text, ...classes) {
    const newElement = document.createElement(element);
    newElement.innerHTML = text;
    for (let index in classes) {
        newElement.classList.add(classes[index]);
    }
    return newElement;
}