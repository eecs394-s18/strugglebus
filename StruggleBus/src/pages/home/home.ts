import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';

import { UserProvider } from '../../providers/user/user';
import { DatabaseProvider, Quarter } from '../../providers/database/database';
import { PipesModule} from '../../pipes/pipes.module'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  aboutPage = AboutPage;
  userData: any;
  userCourses: Observable< any[] >;
  userFriends: any[];
  quarters: Quarter[];
  currentQuarter: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, userService: UserProvider, public db: DatabaseProvider) {
    
    this.userData = userService.userData;
    
    if (this.userData) {
      this.userCourses = db.getUser(this.userData['id'], this.userData['name']);
    }
    
    this.userFriends = userService.userFriends;
    console.log("this.usersFriends length is ", this.userFriends.length);

  } 

  ngOnInit() {
    this.db.getQuarters()
      .subscribe(q => {
        this.quarters = Object.keys(q[0]).map(q => new Quarter(q)); // q is an array of one object of key 0. console.log for details
        this.currentQuarter = this.quarters[0].name;
      });
  }


  addClasses() {
  	this.navCtrl.push(this.aboutPage,  {
      quarter: this.currentQuarter
    });
  }

  compareFn(q1: Quarter, q2: Quarter): boolean {
    if (q1.year == q2.year) {
      return !(q1.season < q2.season);
    } 
    else { 
      return (q1.year > q2.year);
    }
  }

  

}
