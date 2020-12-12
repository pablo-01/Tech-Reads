import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // Output property - emit from child to parent -for registerSwith state
  @Output() registrationCancel = new EventEmitter();
  // register model
  model: any = {};

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  // register method - using account service
  register() {
    this.accountService.register(this.model).subscribe(res=> {
      this.cancelRegister();
    }, error => {
      console.log(error);
    })
  }

  cancelRegister() {
    // emit value using event emitter
    this.registrationCancel.emit(false);
  }

}
