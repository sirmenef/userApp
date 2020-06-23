import {UserServiceService} from './services/user-service.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private api: UserServiceService) {
  }

  allUsers: object[] = [];
  isCountry: boolean;
  currentPage = 1;
  resultsPerPage = 3;
  users: any;
  maxPage = 7;
  CountryList = [];
  pageConfig = {
    page: String(this.currentPage),
    results: String(this.resultsPerPage),
    seed: 'sammy',
  };
  viewUser: object;
  nav: string;

  ngOnInit() {
    this.loadUsers(this.pageConfig);
    // this.getAllUsers();
    // this.getCountry();
    this.showCountry();
    // console.log(this.allUsers);
    // this.log();
  }

  async loadUsers(Config) {
    await this.api.loadUsers(Config).subscribe(
      val => {
        if (val) {
          this.users = val.results;
        }
        // console.log(val.results);
        console.log('users');
        console.log(this.users);
      }
    );
  }

  search(name) {
    // tslint:disable-next-line:no-unused-expression
    this.api.loadUsers({page: '1', seed: 'sammy', results: '20'}).subscribe(res => {
      this.users = res.results.filter(x => x['name']['first'].include(name) || x['name']['last'].include(name)
      );
    });
  }

  // getCountry() {
  //   this.allUsers.forEach(user => {
  //     const country = user['location']['country'];
  //     if (!this.CountryList.includes(country)) {
  //       this.CountryList.push(country);
  //     }
  //   });
  //   console.log(this.CountryList);
  // }

  getUser(name: string) {
    // let object: object;
    // object = this.allUsers.find(x => x === x['name']['first'] || x['name']['last'] || `${x['name']['first']} ${x['name']['last']}`
    // );
    // this.viewUser = object;
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

  async getAllUsers() {
    await this.api.loadUsers({page: '1', results: '20', seed: 'sammy'}).subscribe(res => {
      if (res) {
        this.allUsers = res.results;
      }
    });
  }

  navigateUser(event) {
    this.users = event;
  }
}
