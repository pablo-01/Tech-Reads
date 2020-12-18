import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // Output property - emit from child to parent -for registerSwith state
  @Output() registrationCancel = new EventEmitter();

  // for register form 
  registrationForm: FormGroup;
  // error aray
  validationErr: string[] = [];

  // inject services
  constructor(private toastr: ToastrService ,
    private accountService: AccountService, 
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();

  }

  // initilize registrationForm method
  // names must match to formControlName in view
  // set validation
  // using form builder
  initForm() {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      passwordConfirm: ['', [Validators.required, this.compareInput('password')]]
    });
  }

  ////
  // custom validator for comparing passwords
  // abstract control from angular forms
  ////

  // Accesing control that validator can be attached to (passwordConfirm control)
  compareInput(compareTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[compareTo].value ? null: {doesMatch: true}
    }
  }

  // register method - using account service
  register() {
    //console.log(this.registrationForm.value)
    this.accountService.register(this.registrationForm.value).subscribe(res=> {
      this.router.navigateByUrl('/books');
    }, error => {
      this.validationErr = error;
    })
  }

  cancelRegister() {
    // emit value using event emitter
    this.registrationCancel.emit(false);
  }

}
