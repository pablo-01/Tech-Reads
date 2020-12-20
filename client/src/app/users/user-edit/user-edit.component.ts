import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { readerUser } from 'src/app/_models/readerUser';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { BooksService } from 'src/app/_services/books.service';
import { ReaderUsersService } from 'src/app/_services/reader-users.service';


//// 
//User profile edit component
//TODO - add alert when leaving/closing page window wile changes pending
////
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  // accessing form in ordet to be able to reset it
  @ViewChild('formEdit') formEdit: NgForm;

  ////
  // Variables
  //
  ///

  // user from dto
  readerUser: readerUser;
  // user from account
  user: User;

  // all available categories
  bookCategories: any;

 // new categories
  newCategories: any;

  ////
  // Constructor
  //
  ////
  // inject services
  // access user in component out of observable
  constructor(private accService: AccountService, 
              private toastr: ToastrService, 
              private readerUserService: ReaderUsersService, 
              private fb: FormBuilder, private bookService: BooksService) {
    this.accService.currentUser$.pipe(take(1)).subscribe(user => this.user = user); // current user from account service
   }

  ////
  // Init
  //
  ///
  ngOnInit(): void {
    // execute function
    this.loadReaderUser();
    this.getBookCategories();
  }

  ////
  // Methods
  //
  ////


  // load reader user data
  loadReaderUser() {
    this.readerUserService.getUser(this.user.username).subscribe(user => {
      this.readerUser = user;
      console.log(this.readerUser)
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

  // get all book categories
  getBookCategories() {
    this.bookService.getBookCategories().subscribe(categories => {
      this.bookCategories = categories;
    })
  }


  // add user interests categories
  // prevent if already in interests
  addUserInterest() {
    let selected = this.newCategories;

    if(selected != null) {
      let match = this.readerUser.intrests.filter(function(interest) {
        return interest == selected
      })

      if(match.length == 0) {
        //console.log(match);
        //console.log(selected);
        this.readerUser.intrests.push(selected);
        this.readerUserService.updateUser(this.readerUser).subscribe(() => {
          this.toastr.success('Category added to interests');
        });    
        // this.ngOnInit();
      }

    }
  }
}
