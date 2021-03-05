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

// constructor function
function Book(title, author, pages, published, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.published = published;
    this.read = read;
}

// add book
function addBookToLibrary(event) {
    let book = getBookInfo();
    let isValid = validateBookInfo(book);
    if (!isValid) {
        return;
    }
    hideModal();
    books.push(book);
    cardContainer.appendChild(getCard(book, books.length - 1));
}

// helper
function hideModal(event) {
    modal.style.display = 'none';
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#published').value = '';
    document.querySelector('#read').value = '';
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

// remove book
function removeBook(event) {
    const index = event.target.dataset.id;
    const card = cardContainer.querySelector(`[data-id="${index}"]`).parentElement;
    cardContainer.removeChild(card);
    books.splice(index, 1);
}

// show all books as cards
function displayBooks() {
    for (let index in books) {
        const book = books[index];
        const card = getCard(book, index);
        cardContainer.appendChild(card);
    }
}

// card creator helper
function getCard(book, id) {
    const card = getElement('div', '', 'card');
    const cardRead = getElement('div', 'Read', 'card-read');
    const cardTitle = getElement('div', book.title, 'card-title');
    const cardRemove = getElement('span', '&times;', 'card-remove');
    const cardDescription = getElement('div', '', 'card-description');
    const cardPages = getElement('p', `Pages: ${book.pages}`, 'card-content');
    const cardAuthor = getElement('p', `Author: ${book.author}`, 'card-content');
    const cardPublished = getElement('p', `Published: ${book.published}`, 'card-content');

    if (book.read) cardRead.style.backgroundColor = 'salmon';
    cardRemove.setAttribute('data-id', id);
    cardRemove.addEventListener('click', removeBook);
    cardRead.addEventListener('click', toggleRead);

    cardDescription.appendChild(cardAuthor);
    cardDescription.appendChild(cardPages);
    cardDescription.appendChild(cardPublished);

    card.appendChild(cardRemove);
    card.appendChild(cardTitle);
    card.appendChild(cardDescription);
    card.appendChild(cardRead);

    return card;
}

function toggleRead(event) {
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