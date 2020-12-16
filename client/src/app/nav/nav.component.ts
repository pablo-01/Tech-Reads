import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}


  // dependency injection - format: name: Service
  constructor(public accountService: AccountService, private toastr: ToastrService , private router: Router) { }

  ngOnInit(): void {
  }

  // login method;
  // after succesful login: redirect to books component using Router
  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/books');
    })
  }

  // logout method -using accout service
  // on log out redirect to home page
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
