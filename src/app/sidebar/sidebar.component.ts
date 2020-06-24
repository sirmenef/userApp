import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserServiceService} from '../services/user-service.service';
import {FormControl} from '@angular/forms';
import {config} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // TODO use (keyup.enter)="function"
  // [(ngModel)]= "properties"
  // use [class.ishidden] = "propterty" to hide country

  @Output() usersEmmiter = new EventEmitter();
  @Output() find = new EventEmitter();

  findUser: FormControl;
  users: object[] = [];
  allUsers: object[] = [];
  searchedUser: object[];

  viewUser: object[] = [];
  categories = {
    one: false,
    two: false,
    three: false,
    de_animate_one: false,
    de_animate_two: false,
    de_animate_three: false,
  };

  constructor(private api: UserServiceService) { }

  ngOnInit(): void {
  }

  searchUser(input: string) {
    // let names: any;
    // this.api.loadUsers({page: '1', seed: 'sammy', results: '20'}).subscribe(
    //   val => {
    //     names = val.results;
    //   });
    this.find.emit(input);
  }

  // loadUsers(Config) {
  //   this.api.loadUsers(Config).subscribe(
  //     val => {
  //       if (val) {
  //         this.users = val.results;
  //       }
  //     }
  //   );
  // }

  // changeUsers(name: string, users?: {}[]) {
  //   switch (name) {
  //     case 'male':
  //     case 'female':
  //       this.users = users;
  //       break;
  //     case 'all users':
  //       this.loadUsers(this.pageConfig);
  //       break;
  //   }
  // }

  setUserView(gender: string) {
    this.usersEmmiter.emit(gender);
    // switch (gender) {
    //   case 'male':
        // if (this.maleConfig.currentPage === this.maleConfig.maxpPage) {
        //   this.maleConfig.resultsPerPage = 2;
        //   this.loadUsers(this.maleConfig);
        //   this.maleConfig.resultsPerPage = 3;
        // }
        // else {
        //   this.loadUsers(this.maleConfig);
        //   this.maleConfig.currentPage++;
        // }
        // this.usersEmmiter.emit(this.maleConfig);
      //   break;
      // case 'female':
        // if (this.femaleConfig.currentPage === this.femaleConfig.maxPage) {
        //   this.loadUsers(this.femaleConfig);
        // }
        // else {
        //   this.loadUsers(this.femaleConfig);
        //   this.femaleConfig.currentPage++;
        // }
      //   this.usersEmmiter.emit(this.femaleConfig);
      //   break;
      // case 'all users':
      //   if (this.pageConfig.currentPage === this.pageConfig.maxPage) {
      //     this.pageConfig.resultsPerPage = 2;
      //     this.loadUsers(this.pageConfig);
      //     this.pageConfig.resultsPerPage = 3;
      //   }
      //   else {
      //     this.loadUsers(this.maleConfig);
      //     this.pageConfig.currentPage++;
      //   }
    // }
  }



  // getAllUsers() {
  //   this.api.loadUsers({page: 1, seed: 'sammy', results: '20'}).subscribe(res => {
  //     this.allUsers = (res) ? res.results : null;
  //   });
  // }

  btnAnimate(category: string) {
    switch (category) {
      case 'all users':
        this.categories.one = true;
        this.categories.two = false;
        this.categories.three = false;
        this.categories.de_animate_one = false;
        this.categories.de_animate_two = true;
        this.categories.de_animate_three = true;
        break;
      case 'male users':
        this.categories.one = false;
        this.categories.two = true;
        this.categories.three = false;
        this.categories.de_animate_one = true;
        this.categories.de_animate_two = false;
        this.categories.de_animate_three = true;
        break;
      case 'female users':
        this.categories.one = false;
        this.categories.two = false;
        this.categories.three = true;
        this.categories.de_animate_one = true;
        this.categories.de_animate_two = true;
        this.categories.de_animate_three = false;
        break;
      default:
        this.categories.one = false;
        this.categories.two = false;
        this.categories.three = false;
        this.categories.de_animate_one = false;
        this.categories.de_animate_two = false;
        this.categories.de_animate_three = false;
        break;
    }
  }
}
