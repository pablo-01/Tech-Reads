import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/_models/books';
import { BooksService } from 'src/app/_services/books.service';

@Component({
  selector: 'app-book-profile',
  templateUrl: './book-profile.component.html',
  styleUrls: ['./book-profile.component.css']
})
export class BookProfileComponent implements OnInit {
  book: Book;

  constructor(private route: ActivatedRoute, private bookService: BooksService) { }

  ngOnInit(): void {
    this.loadBook();
  }

  // load book by _id; using route from routing
  loadBook() {
    this.bookService.getBook(this.route.snapshot.paramMap.get('_id')).subscribe(book => {
      this.book = book;
    })
  }

}
