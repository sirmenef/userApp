import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../services/user-service.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {

  constructor(private api: UserServiceService) { }

  currentPage = 1;
  resultsPerPage = 3;
  users: any;
  maxPage = 7;

  pageConfig = {
    page: String(this.currentPage),
    results: String(this.resultsPerPage),
    seed: 'sammy',
  };

  ngOnInit(): void {
  }


  loadUsers(Config) {

    this.api.loadUsers(Config).subscribe(
      val => {
        if (val) {
          this.users = val.results;
        }
        console.log(val.results);
      }
    );
  }

  getUsers(user: any) {

  }

  downloadUsers() {
    this.api.downloadUsers({ results: '3', seed: 'sammy', format: `csv&dl` }).subscribe();
  }

  getMaleUsers() {

  }

  getFemaleUsers() {

  }
}
