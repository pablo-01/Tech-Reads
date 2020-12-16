import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-side-err',
  templateUrl: './server-side-err.component.html',
  styleUrls: ['./server-side-err.component.css']
})
export class ServerSideErrComponent implements OnInit {
  err: any;

    // inject routes to access router state
    // only accesible in constructor
    // "?" optional chaning operator
    // check extras, check state
  constructor(private router: Router) { 
    const nav = this.router.getCurrentNavigation();
    this.err = nav?.extras?.state?.error;
  }

  ngOnInit(): void {
  }

}
