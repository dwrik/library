// demo data
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

// constants for read status
const ALL = '0';
const READ = '1';
const NOT_READ = '2';

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

// filter
const filterSelector = document.querySelector('#filter');
filterSelector.addEventListener('change', filterBy);

// initial call
displayBooks();

// Book
class Book {
    constructor(title, author, pages, published, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.published = published;
        this.read = read;
    }
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
    updateStorage();
}

// remove book
function removeBook(event) {
    const card = event.target.parentElement;
    cardContainer.removeChild(card);

    const index = card.dataset.id;
    books.splice(index, 1);
    updateStorage();
}

// toggle book read status
function toggleRead(event) {
    const card = event.target.parentElement;

    const index = card.dataset.id;
    books[index].read = (books[index].read)? false : true;

    const cardRead = card.querySelector('.card-read');
    cardRead.classList.toggle('card-read-selected');
    cardRead.innerHTML = (books[index].read)? 'Read' : 'Not Read';
    updateStorage();
}

// filter books
function filterBy(event) {
    const filter = filterSelector.value;
    switch (filter) {
        case ALL:      displayBooks();     break;
        case READ:     showReadBooks();    break;
        case NOT_READ: showNotReadBooks(); break;
    }
}

// read books
function showReadBooks() {
    removeAllCards();
    books.forEach((book, index) => {
        if (!book.read) return;
        const card = getCard(book, index);
        cardContainer.appendChild(card);
    });
}

// not read books
function showNotReadBooks() {
    removeAllCards();
    books.forEach((book, index) => {
        if (book.read) return;
        const card = getCard(book, index);
        cardContainer.appendChild(card);
    });
}

// remove all cards
function removeAllCards() {
    const allCards = [ ...document.querySelectorAll('.card') ];
    allCards.forEach((card) => cardContainer.removeChild(card));
}

// store books in local storage
function updateStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}

// delete persistent library data
function deleteStorage() {
    localStorage.clear();
}

// get user input
function getBookInfo() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const published = document.querySelector('#published').value;
    const read = (document.querySelector('#read').value === 'yes')? true : false;
    return new Book(
        title,
        author,
        pages,
        published,
        read,
    );
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

// check for empty strings
function validateBookInfo(book) {
    const keys = Object.keys(book);
    return keys.every((key) => {
        if (key === 'read') return true;
        return book[key].length > 0;
    });
}

// show all books as cards
function displayBooks() {
    removeAllCards();

    // check for existing library
    const storage = localStorage.getItem('books');
    books = JSON.parse(storage) ?? books;

    books.forEach((book, index) => {
        const card = getCard(book, index);
        cardContainer.appendChild(card);
    });
}

// card creator helper
function getCard(book, id) {
    const card = getElement('div', '', 'card');
    const cardRead = getElement('div', book.read? 'Read' : 'Not Read', 'card-read');
    const cardTitle = getElement('div', book.title, 'card-title');
    const cardRemove = getElement('span', '&times;', 'card-remove');
    const cardDescription = getElement('div', '', 'card-description');
    const cardPages = getElement('p', `Pages: ${book.pages}`, 'card-content');
    const cardAuthor = getElement('p', `Author: ${book.author}`, 'card-content');
    const cardPublished = getElement('p', `Published: ${book.published}`, 'card-content');

    if (book.read) cardRead.classList.add('card-read-selected');
    cardRemove.addEventListener('click', removeBook);
    cardRead.addEventListener('click', toggleRead);
    card.setAttribute('data-id', id);

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
    classes.forEach((customClass) => newElement.classList.add(customClass));
    newElement.innerHTML = text;
    return newElement;
}