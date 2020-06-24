import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  constructor() { }

  // tslint:disable-next-line:no-input-rename
  @Input('users') users: any;
  // tslint:disable-next-line:no-input-rename
  @Input('filter-options') filterOptions: string[];
  // tslint:disable-next-line:no-input-rename
  @Input('page-title') pageTitle: string;
  // tslint:disable-next-line:no-output-rename
  @Output('filter') filter = new EventEmitter(); // todo
  // tslint:disable-next-line:no-output-rename
  @Output('nav') navigate = new EventEmitter();
  // tslint:disable-next-line:no-output-rename
  // @Output('filter-selected') selectedFilter = new EventEmitter(); // done
  // tslint:disable-next-line:no-output-rename
  // @Output('user') viewUser = new EventEmitter();

  selectedUser: object;
  showList = true;
  isCountryShown: boolean;
  form: FormGroup = new FormGroup({
    searchInput: new FormControl(''),
    filter: new FormControl('')
  });
  isDisabled = false;

  ngOnInit(): void {
    this.form.setValue({filter: 'Country', searchInput: ''});
  }

  showCountry() {
    this.isCountryShown = !this.isCountryShown;
  }

  filterInput() {
    console.log(this.form.value);
    this.filter.emit(this.form.value);
  }

  navigator(input: string) {
    this.navigate.emit(input);
  }

  checkUser(user: object) {
    this.selectedUser = user;
    this.showList = false;
    this.isDisabled = !this.isDisabled;
  }

  goBack() {
    this.showList = !this.showList;
  }
}
