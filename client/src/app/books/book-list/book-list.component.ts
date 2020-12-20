import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/_models/books';
import { BooksService } from 'src/app/_services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  ////
  // Variables
  //
  ////


  books: Book[];

  newBooks: Book[];

  // available book categories
  bookCategories: any;

  newCategories: any;

  booksByCategory: any;



// searchTerm storage
  serachTerm: any;

// book authors list 

 bookAuthors: any;




  ////
  // Constructor
  // 
  ////


  // inject service
  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    
    this.filterByCategory();
  }

  ////
  // Load data
  //
  ////

  // loading books; using bookService
  loadBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      console.log(books);
    })
    this.getBookCategories();
  }

   // get all book categories
   getBookCategories() {
    this.bookService.getBookCategories().subscribe(categories => {
      this.bookCategories = categories;
    })
    this.getAuthors();
  }

  //// Note:
  // get authos - TODO improve 
  // (refactor: use Mongodb $text search for all of the filtering and searching funconality)
  // to future-proof this 
  // (keping in mind that in "production" there will be more books and pagination with calls to DB ) 
  ////


  // get author list
  getAuthors() {
    this.bookService.getAuhors().subscribe(authors => {
      this.bookAuthors = authors;
      console.log(authors);
    });
  }


 ////
 // Filtering, Searching
 //
 ////

  // on button filter, filter by category
  filterByCategory() {
    console.log(this.newCategories);
    if(this.newCategories == null){
      // TO improve, no need to cal DB since I have all the books on client side already TODO
      this.loadBooks()
    }
    else{
      //console.log(this.newCategories);
      this.books = this.books.filter(
      book => book.category === this.newCategories);
    }
  }

 // Choose category, reset books
  changeCategory(event) {
    console.log("changed");
    this.loadBooks();
    
  }


// author filter - TO FINISH
  filterByAuthor() {
    //console.log(this.getAuthors);
    if(this.serachTerm == null){
      // TO improve, no need to cal DB since I have all the books on client side already TODO
      this.loadBooks()
    }
    else{
     console.log(this.serachTerm);
     
     this.books = this.books.filter(
      book => book.authors === this.serachTerm); // get values out of the arrays TODO
      


      console.log(this.books);
    
      // ECMAScript 2016
      //console.log(Object.values(this.books).includes("David Flanagan"));
    }
}
}