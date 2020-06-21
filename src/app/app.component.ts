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

  isCountry: boolean;
  currentPage = 1;
  resultsPerPage = 3;
  users: any;
  maxPage = 7;
  allUsers: object[];
  CountryList: string[];
  pageConfig = {
    page: String(this.currentPage),
    results: String(this.resultsPerPage),
    seed: 'sammy',
  };

  ngOnInit() {
    this.loadUsers(this.pageConfig);
    this.getAllUsers({page: '1', results: '20', seed: 'sammy'});
    this.getCountry();
    this.showCountry();
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

  getAllUsers(config: object) {
    this.api.loadUsers(config).subscribe(res => {
      if (!res) {
        return;
      }
      this.allUsers = res;
    });
  }

  downloadUsers() {
    this.api.downloadUsers({ results: '3', seed: 'sammy', format: `csv&dl` }).subscribe();
  }

  getCountry() {
    const objects = this.allUsers.filter(user => {
      const country: string = user['location']['country'];
      this.CountryList.find(x => x === country);
    });
  }

  getUser(name: string) {
    this.allUsers.find(x => {
      const firstname = x['name']['first'];
      const lastname = x['name']['last'];
      x === firstname || lastname || `${firstname} ${lastname}`;
    });
  }
  getMaleUsers() {

  }

  getFemaleUsers() {

  }

  showCountry() {
   this.isCountry = !this.isCountry;
  }

  searchUser(input: string) {
    let names: any;
    this.api.loadUsers({page: '1', seed: 'sammy', results: '20'}).subscribe(
      val => {
        names = val.results;
      });
  }
}
