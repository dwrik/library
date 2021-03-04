let library = [
    {
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        pages: 599,
        read: true,
    },
    {
        title: 'Sherlock Holmes',
        author: 'Sir Arthur Conan Doyle',
        pages: 879,
        read: false,
    },
    {
        title: 'Digital Fortress',
        author: 'Dan Brown',
        pages: 389,
        read: false,
    },
];

// constructor function
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
}

function displayBooks() {
    for (let index in library) {
        console.log(library[index]);
    }
}

displayBooks();