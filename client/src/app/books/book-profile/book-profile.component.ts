import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { findIndex, take } from 'rxjs/operators';
import { Book } from 'src/app/_models/books';
import { readerUser } from 'src/app/_models/readerUser';
import { Review } from 'src/app/_models/review';
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

  categoryCount: any;


  // ratings data for chart
  seedData: any[] = [];

  // review input

  newReview: string;


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
      this.getRatingsData();
    })
  }


  //  
  addBookToModel() {
    // TODO FIX CHECK if in history aleardy
    let id = this.book._id;
    let val = this.readerUser.history.filter(function(read) {
      return read.bookId == id;
    });
    if (val.length > 0 ) {
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
    this.ngOnInit();
    })
  }


  // load reader user data
  loadReaderUser() {
    this.readerUserService.getUser(this.user.username).subscribe(user => {
      this.readerUser = user;
    })
  }

  // extract data for rating distributuin chart
  // get occurances
  getRatingsData() {
    var occurance = this.book.ratings.reduce(function(occ, item) {
      occ[item] = (occ[item] || 0) + 1;
      return occ;
    }, {});
    // assign
    this.categoryCount = occurance;

    // convert to format required by ngx-charts
    Object.entries(this.categoryCount).map(([key, value]) =>  {
      this.seedData.push({name: key, value: value})
      return this.seedData;
    });
  }

  // format to remove decimal ppint on y axis 
  formatNumbers = (e: number) => {
    return e;

  }


  reviewAddAndUpdate() {
    this.book.reviews.push({reviewer: this.user.username, review: this.newReview})
    console.log(this.book);
    
    
    this.bookService.bookUpdate(this.book._id ,this.book).subscribe(() => {
       this.toastr.success('Review Added');
     })

    //this.bookService.bookUpdate(this.book);


    /// TODO implement bookUpdate()


    // console.log('Existing reviews');
    // console.log(this.book.reviews);

    // // username of logged in user
    // console.log('logged in user');
    // console.log(this.readerUser.username);

    // console.log(this.newReview);
    // this.toastr.success('Review added');

  }
}
