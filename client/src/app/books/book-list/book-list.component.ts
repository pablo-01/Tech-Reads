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

  // inject service
  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  // loading books; using bookService
  loadBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    })
  }

}
