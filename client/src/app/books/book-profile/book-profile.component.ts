import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Book } from 'src/app/_models/books';
import { readerUser } from 'src/app/_models/readerUser';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { BooksService } from 'src/app/_services/books.service';
import { ReaderUsersService } from 'src/app/_services/reader-users.service';

@Component({
  selector: 'app-book-profile',
  templateUrl: './book-profile.component.html',
  styleUrls: ['./book-profile.component.css']
})
export class BookProfileComponent implements OnInit {
  book: Book;

  // user from dto
  readerUser: readerUser;

  // user from account
  user: User;


  // ratings temp data

  seedData = [
    {name: "2012", value: 3},
    {name: "2013", value: 7},
    {name: "2014", value: 13},
    {name: "2015", value: 7},
    {name: "2016", value: 23},
    {name: "2017", value: 37},
    {name: "2018", value: 12},
    {name: "2019", value: 22}
  ];

  constructor(private accService: AccountService,
    private route: ActivatedRoute, 
    private bookService: BooksService, 
    private readerUserService: ReaderUsersService,
    private toastr: ToastrService) { 
    this.accService.currentUser$.pipe(take(1)).subscribe(user => this.user = user)}

  ngOnInit(): void {
    this.loadBook();
    this.loadReaderUser();
  }

  // load book by _id; using route from routing
  loadBook() {
    this.bookService.getBook(this.route.snapshot.paramMap.get('_id')).subscribe(book => {
      this.book = book;

    })
  }



  addBookToModel() {
    // TODO FIX CHECK if in history aleardy
    if (this.book._id in this.readerUser.history) {
      this.toastr.error("Book already in history");
    }
    else {
      this.readerUser.history.push({"bookId": this.book._id, "dateAdded": new Date().toISOString() })
      console.log('added book to model');
      this.saveHistory();
    }

  }


  saveHistory() {
    console.log("History after added to reader user model is: ")
    console.log(this.readerUser.history);
    this.readerUserService.updateUser(this.readerUser).subscribe(() => {
    this.toastr.success("Saved to history");
    })
  }


  // load reader user data
  loadReaderUser() {
    this.readerUserService.getUser(this.user.username).subscribe(user => {
      this.readerUser = user;
    })
  }

}
