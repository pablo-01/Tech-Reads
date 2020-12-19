import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { readerUser } from 'src/app/_models/readerUser';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ReaderUsersService } from 'src/app/_services/reader-users.service';


//// 
//User profile edit component
//TODO - add alert when leaving page wile changes pending
////
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  // accessing form in ordet to be able to reset it
  @ViewChild('formEdit') formEdit: NgForm;

  // user from dto
  readerUser: readerUser;

  // user from account
  user: User;

  // inject services
  // access user in component out of observable
  constructor(private accService: AccountService, private toastr: ToastrService ,private readerUserService: ReaderUsersService) {
    this.accService.currentUser$.pipe(take(1)).subscribe(user => this.user = user); // current user from account service
   }

  ngOnInit(): void {
    // execute function
    this.loadReaderUser();
  }

  // load reader user data
  loadReaderUser() {
    this.readerUserService.getUser(this.user.username).subscribe(user => {
      this.readerUser = user;
    })
  }

  // updating readerUser model
  updateUser() {
    this.readerUserService.updateUser(this.readerUser).subscribe(() => {
      // notification
      this.toastr.success("Changes were saved");
      // reset form after update with new data
      this.formEdit.reset(this.readerUser);
    })
  }

}
