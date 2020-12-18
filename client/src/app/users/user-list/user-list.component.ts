import { Component, OnInit } from '@angular/core';
import { readerUser } from 'src/app/_models/readerUser';
import { ReaderUsersService } from 'src/app/_services/reader-users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  readerUsers: readerUser[];

  // inject services
  constructor(private userService: ReaderUsersService) { }

  ngOnInit(): void {
    this.loadUsers();
  }


  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.readerUsers = users;
    })
  }

}
