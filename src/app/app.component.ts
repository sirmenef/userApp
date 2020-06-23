import {UserServiceService} from './services/user-service.service';
import {Component, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';

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
  maleUsers: object[];
  femaleUser: object[];
  filterByOptions: string[] = ['Country', 'Name'];
  pagetitle = 'All Users';
  currentView = 'all users';
  filteredUsers: object[];
  users: any;
  checkedUser: object;
  pageConfig = {
    currentPage: 1,
    resultsPerPage: 3,
    maxPage: 7,
    page() {
      return this.currentPage.toString();
    },
    results() {
      return this.resultsPerPage.toString();
    },
    seed: 'sammy',
  };
  maleConfig = {
    currentPage: 1,
    resultsPerPage: 3,
    maxPage: 4,
    start: 0,
    end: 3,
  };
  femaleConfig = {
    currentPage: 1,
    resultsPerPage: 3,
    maxPage: 3,
    start: 0,
    end: 3,
  };
  filterConfig = {
    currentPage: 1,
    resultsPerPage: 3,
    maxPage: 0,
    start: 0,
    end: 3,
  };
  nav: string;

  ngOnInit() {
    this.loadUsers(this.pageConfig);
    this.getAllUsers();
    // this.getCountry();
    this.showCountry();
    // console.log(this.allUsers);
    // this.log();
  }

  loadUsers(Config) {
    this.api.loadUsers(Config).subscribe(
      val => {
        if (val) {
          this.users = val.results;
        }
        console.log('users');
        console.log(this.users);
      }
    );
  }

  setUserView(type: string) {
    switch (type) {
      case 'all users':
        this.loadUsers(this.pageConfig);
        this.currentView = 'all users';
        break;
      case 'male':
        const maleUser = this.allUsers.filter(x => x['gender'] === 'male');
        if (maleUser.length > 0) {
          this.users = maleUser.slice(0, 3);
          this.maleUsers = maleUser;
          this.currentView = 'male';
        }
        break;
      case 'female':
        const femaleUser = this.allUsers.filter(x => x['gender'] === 'female');
        if (femaleUser.length > 0   ) {
          this.users = femaleUser.slice(0, 3);
          this.femaleUser = femaleUser;
          this.currentView = 'female';
        }
        break;
    }
  }

  getAllUsers() {
    this.api.loadUsers({page() {return '1'; }, results() {return '20'; }, seed: 'sammy'}).subscribe(res => {
      if (res) {
        this.allUsers = res.results;
      }
    });
  }

  search(name: string) {
    const val =  name['0'].toUpperCase() + name.slice(1);
    const indexOfSpace: number = name.indexOf(' ');
    if (indexOfSpace > 1) { name[indexOfSpace + 1].toUpperCase(); }
    this.api.loadUsers({page() {return '1'; }, seed: 'sammy', results() { return '20'; } }).subscribe(res => {
      this.users = res.results.filter(x => x['name']['first'].includes(val) || x['name']['last'].includes(val));
    });
  }

  filterUsers(filtered: object) {
    const val =  filtered['searchInput']['0'].toUpperCase() + filtered['searchInput'].slice(1);
    if (filtered['filter'] === 'Country') {
      this.filteredUsers = this.allUsers.filter(x => x['location']['country'].includes(val));
      this.users = this.filteredUsers.slice(0, 3);
    } else if (filtered['filter'] === 'Name') {
      this.filteredUsers = this.allUsers.filter(x => x['name']['first'].includes(val) || x['name']['last'].includes(val));
      this.users = this.filteredUsers.slice(0, 3);
    }
    const length = this.filteredUsers.length;
    if (this.filteredUsers.length > 3) {
      this.filterConfig.maxPage = ((length % 3) === 0) ? (length / 3) : ((length / 3) + 1);
    } else { this.filterConfig.maxPage = 1; }
  }

  showCountry() {
    this.isCountry = !this.isCountry;
  }

  navigate(input: string) {
   switch (input) {
     case 'next':
       switch (this.currentView) {
         case 'all users':
           if (this.pageConfig.currentPage > this.pageConfig.maxPage) { return; }
           if (this.pageConfig.currentPage === this.pageConfig.maxPage) {
              this.pageConfig.resultsPerPage = 2;
              this.loadUsers(this.pageConfig);
           } else if (this.maleConfig.currentPage > 0) {
              this.pageConfig.resultsPerPage = 3;
              this.pageConfig.currentPage++;
              this.loadUsers(this.pageConfig);
           }
           this.maleConfig.currentPage = 1;
           this.femaleConfig.currentPage = 1;
           this.filterConfig.currentPage = 1;
           break;
         case 'male':
           if (this.maleConfig.currentPage > this.maleConfig.maxPage) { return; }
           if (this.maleConfig.currentPage === this.maleConfig.maxPage) {
             this.users = this.maleUsers.slice(9);
           } else if (this.maleConfig.currentPage > 0) {
             this.maleConfig.start += 3;
             this.maleConfig.end += 3;
             this.maleConfig.currentPage++;
             this.users = this.maleUsers.slice(this.maleConfig.start, this.maleConfig.end);
           }
           this.pageConfig.currentPage = 1;
           this.femaleConfig.currentPage = 1;
           this.filterConfig.currentPage = 1;
           break;
         case 'female':
           if (this.femaleConfig.currentPage > this.femaleConfig.maxPage) { return; }
           else if (this.femaleConfig.currentPage === this.femaleConfig.maxPage) {
             this.users = this.femaleUser.slice(this.femaleConfig.start);
           } else if (this.femaleConfig.currentPage > 0) {
             this.femaleConfig.currentPage++;
             this.femaleConfig.start += 3;
             this.femaleConfig.end += 3;
             this.users = this.femaleUser.slice(this.femaleConfig.start, this.femaleConfig.end);
           }
           break;
           this.maleConfig.currentPage = 1;
           this.pageConfig.currentPage = 1;
           this.filterConfig.currentPage = 1;
         default:
           if (this.filterConfig.currentPage > this.filterConfig.maxPage) { return; }
           else if (this.filterConfig.currentPage === this.filterConfig.maxPage) {
             this.users = this.maleUsers.slice(this.femaleConfig.start);
           } else if (this.filterConfig.currentPage > 0) {
             this.femaleConfig.start += 3;
             this.femaleConfig.end += 3;
             this.femaleConfig.currentPage++;
             this.users = this.femaleUser.slice(this.femaleConfig.start, this.femaleConfig.end);
           }
           this.maleConfig.currentPage = 1;
           this.femaleConfig.currentPage = 1;
           this.pageConfig.currentPage = 1;
       }
       break;
     case 'prev':
       switch (this.currentView) {
         case 'all users':
           if (this.pageConfig.currentPage === 1) {
             return;
           }
           if (this.pageConfig.currentPage === this.pageConfig.maxPage) {
             this.pageConfig.resultsPerPage = 2;
             this.loadUsers(this.pageConfig);
           } else if (this.pageConfig.currentPage < this.pageConfig.maxPage) {
             this.pageConfig.resultsPerPage = 3;
             this.pageConfig.currentPage--;
             this.loadUsers(this.pageConfig);
           }
           this.maleConfig.currentPage = 1;
           this.femaleConfig.currentPage = 1;
           this.filterConfig.currentPage = 1;
           break;
         case 'male':
           if (this.maleConfig.currentPage === 1) {
             return;
           }
           if (this.maleConfig.currentPage === this.maleConfig.maxPage) {
             this.users = this.maleUsers.slice(9);
           } else if (this.maleConfig.currentPage < this.pageConfig.maxPage) {
             this.maleConfig.start -= 3;
             this.maleConfig.end -= 3;
             this.users = this.maleUsers.slice(this.maleConfig.start, this.maleConfig.end);
             this.maleConfig.currentPage--;
           }
           this.pageConfig.currentPage = 1;
           this.femaleConfig.currentPage = 1;
           this.filterConfig.currentPage = 1;
           break;
         case 'female':
           if (this.femaleConfig.currentPage === 1) {
             return;
           } else if (this.femaleConfig.currentPage > 1) {
             this.femaleConfig.start -= 3;
             this.femaleConfig.end -= 3;
             this.users = this.femaleUser.slice(this.femaleConfig.start, this.femaleConfig.end);
             this.femaleConfig.currentPage--;
           }
           this.maleConfig.currentPage = 1;
           this.pageConfig.currentPage = 1;
           this.filterConfig.currentPage = 1;
           break;
       }
       break;
   }
  }

  checkUser(user: object) {
    // this.checkedUser = user;
    this.filterUsers(user);
  }
}
