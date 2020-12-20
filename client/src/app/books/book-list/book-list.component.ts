import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/_models/books';
import { BooksService } from 'src/app/_services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];

  newBooks: Book[];

  // available book categories
  bookCategories: any;

  newCategories: any;

  booksByCategory: any;

  // inject service
  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    
    this.filterByCategory();
  }

  // loading books; using bookService
  loadBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    })
    this.getBookCategories();
  }

   // get all book categories
   getBookCategories() {
    this.bookService.getBookCategories().subscribe(categories => {
      this.bookCategories = categories;
    })
  }

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
      cat => cat.category === this.newCategories);
    }
  }

 // Choose category, reset books
  changeCategory(event) {
    console.log("changed");
    this.loadBooks();
    
  }
  

}
