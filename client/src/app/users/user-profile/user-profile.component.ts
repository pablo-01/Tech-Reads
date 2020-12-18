import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { readerUser } from 'src/app/_models/readerUser';
import { BooksService } from 'src/app/_services/books.service';
import { ReaderUsersService } from 'src/app/_services/reader-users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  readerUser: readerUser;
  readingHistory: any = [];

  // inject services
  constructor(private userService: ReaderUsersService, private route: ActivatedRoute, private bookService: BooksService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  // loading user profile
  loadUser() {
    // 
    this.userService.getUser(this.route.snapshot.paramMap.get('id')).subscribe(user => {
      console.log(user);
      this.readerUser = user;
      this.loadUserBooks();
    })
  }

  // load books from user reading history 
  loadUserBooks() {
    for (let history of this.readerUser.history) {
      console.log(history);
      this.bookService.getBook(history.bookId).subscribe(book => {
        console.log(book);
        this.readingHistory.push(book);
      });
    }
  }
}
