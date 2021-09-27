//ALL SELECTORS
const title = document.querySelector('#title'),
      author = document.querySelector('#author'),
      isbn = document.querySelector('#isbn'),
      bookForm = document.querySelector('#book-form'),
      bookList = document.querySelector('#book-list'),
      deleteItem = document.querySelector('.delete'),
      container = document.querySelector('.container'),
      form = document.querySelector('#book-form');

//                                         START OF ALL CLASSES

//BOOK CLASS
 class Book{
  constructor(title,author,isbn) {
    this.title = title;
    this.author =author;
    this.isbn = isbn;
  }  
}

//UI CLASS
class UI{

  //Add to booklist function
  static addBookList(book){
    const row = document.createElement('tr');
    row.className = 'row';
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}f</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `
    bookList.appendChild(row);    
  }

  //CLEAR FIELDS FUNCTION
  static clearFields(){
    title.value = '';
    author.value = '';
    isbn.value = '';
  }
  //show Alert function
  static showAlert(message,alertClass){
    if(container.childElementCount < 5){
      const alert = document.createElement('div');
      alert.className = 'alert';
      alert.classList.add(alertClass);
      alert.innerHTML = `<p>${message}</p>`;
      container.insertBefore(alert,form);

      setTimeout(() => {
        alert.remove();
      }, 2000);
    }    
  }
  //delete book function
  static deleteBook(target){
    if(target.className == 'delete'){
      target.parentElement.parentElement.remove();
      UI.showAlert('Book Added..','alert-success');
    }
  }
}

//STORE CLASS FOR LS
class Store{
    //Get books array from LS
    static getBooks(){
      let books;
      if(localStorage.getItem('books') === null){
        books = [];
      }else{
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }  

  //Storing to LS function
  static addBook(book){

    let books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
  }


  //Remove from LS function
  static removeBook(isbn){
    let books = Store.getBooks(); 
    books.forEach((book,index)=>{
      if(book.isbn === isbn){
        books.splice(index,1);
      }
    });
    
    localStorage.setItem('books',JSON.stringify(books));
  }


//Displaying books from LS
  static displayBook(){
    const books = Store.getBooks();
    books.forEach(book=>{
      const row = document.createElement('tr');
      row.className = 'row';
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
      `
      bookList.appendChild(row);
    })
  }
}
 //                                     END OF ALL CLASSES


//                                      START OF ALL EVENT LISTENERS
//Event listener on Submit button
bookForm.addEventListener('submit', e =>{
  //book instance
  const book = new Book(title.value,author.value,isbn.value);

  //validation condition
  if(title.value === '' || author.value === '' || isbn.value === ''){
    UI.showAlert('Please fill in all the fields.','alert-error');     
  }

  else{
    //add book to list
    UI.addBookList(book);
    Store.addBook(book);
    UI.showAlert('Book Added..','alert-success');
    
    //clear fields
    UI.clearFields();
    }

  e.preventDefault();
});


//Event listener on delete button
bookList.addEventListener('click', e => {
  UI.deleteBook(e.target);
  //delete from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});


//Event listener after DOM loaded
document.addEventListener('DOMContentLoaded',Store.displayBook);

