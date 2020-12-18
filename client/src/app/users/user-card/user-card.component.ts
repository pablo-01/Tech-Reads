import { Component, Input, OnInit } from '@angular/core';
import { readerUser } from 'src/app/_models/readerUser';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: readerUser;   //receiving from parent

  constructor() { }

  ngOnInit(): void {
  }

}
