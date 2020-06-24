/* tslint:disable */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() user;
  @Output() back = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  goBack() {
    this.back.emit();
  }
}
