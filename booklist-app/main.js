class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><button href="#" class="btn btn-sm btn-danger delete">X</button></td>
    `

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.target.classList.contains('btn-danger')) {
      el.target.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Remove after x seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1)
      }
    })

    localStorage.setItem('books', JSON.stringify(books));
  }
}


document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  if(title === ''  || author === '' || isbn === '') {
    UI.showAlert('Please fill all fields', 'danger'); 
  } else {
    //Instantiate books from Book class
    const book = new Book(title, author, isbn);
    // Add book to UI
    UI.addBookToList(book);

    // Add book to local storage
    Store.addBook(book);

    // Show success alert message 
    UI.showAlert('Book Added!', 'success');

    //Clear input fields on submission of the form
    UI.clearFields();
  }
})

//  Remove a Book
document.querySelector('#book-list').addEventListener('click', (el) => {
  // Delete book from UI
  UI.deleteBook(el);

  // Delete book from local storage
  Store.removeBook(el.target.parentElement.previousElementSibling.textContent)

  // Show success alert message 
  UI.showAlert('Book Removed!', 'success');
})
