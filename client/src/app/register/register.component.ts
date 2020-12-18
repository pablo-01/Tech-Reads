import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  // register form 
  registrationForm: FormGroup;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.initForm();

  }

  // initilize registrationForm method
  // names must match to formControlName in view
  // set validation
  initForm() {
    this.registrationForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]),
      passwordConfirm: new FormControl('', [Validators.required, this.compareInput('password')])
    });
  }

  ////
  // custom validator for comparing passwords
  // abstract control from angular forms
  ////

  // Accesing control that validator can be attached to (passwordConfirm control)
  // 
  compareInput(compareTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[compareTo].value ? null: {doesMatch: true}
    }
  }

  // register method - using account service
  register() {
    console.log(this.registrationForm.value)
    // this.accountService.register(this.model).subscribe(res=> {
    //   this.cancelRegister();
    // }, error => {
    //   console.log(error);
    // })
  }

  cancelRegister() {
    // emit value using event emitter
    this.registrationCancel.emit(false);
  }

}
