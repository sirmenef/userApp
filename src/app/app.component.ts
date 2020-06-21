import { UserServiceService } from './services/user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private api: UserServiceService) {

  }

  currentPage = 1;
  resultsPerPage = 3;
  users: any;
  maxPage = 7;

  pageConfig = {
    page: String(this.currentPage),
    results: String(this.resultsPerPage),
    seed: 'sammy',
  };

  ngOnInit() {
    this.loadUsers(this.pageConfig);
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
