import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // set default swith value for register form
  registerState = false;


  constructor() { }

  ngOnInit(): void {
  }

  // register switch function
  registerStateSwitch() {
    this.registerState = !this.registerState;
  }


  // function to set registration state to false; paramater from child component
  cancelRegistrationState(event: boolean) {
    this.registerState = event;
  }

}
