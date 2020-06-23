import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-newcard',
  templateUrl: './newcard.component.html',
  styleUrls: ['./newcard.component.css']
})
export class NewcardComponent implements OnInit {

  @Input() user;
  @Input() isCountryShown;
  @Output() sendUser = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  checkUser(user) {
    this.sendUser.emit(user);
  }
}
