import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { QuarterPipe } from '../../pipes/quarter/quarter';
import { UserProvider } from '../../providers/user/user';
import { DatabaseProvider, Quarter } from '../../providers/database/database';
import { PipesModule} from '../../pipes/pipes.module'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [QuarterPipe]
})
export class HomePage implements OnInit {

  aboutPage = AboutPage;
  userData: any;
  userCourses: any;
  userFriends: any[];
  quarters: Quarter[];
  currentQuarter: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, userService: UserProvider, public db: DatabaseProvider) {

    this.userData = userService.userData;

    this.userFriends = userService.userFriends;
    console.log("this.usersFriends length is ", this.userFriends.length);

  }

  ngOnInit() {
    this.db.getQuarters()
      .subscribe(q => {
        this.quarters = Object.keys(q[0]).map(q => new Quarter(q)); // q is an array of one object of key 0. console.log for details
        this.currentQuarter = this.quarters[0].name;
      });

    if (this.userData) {
      this.db.getUser(this.userData['id'], this.userData['name'])
      .subscribe(ci => {
        this.userCourses = {}; //Gets first element which should be courses_interested, need to check it exists
        for (let quarter in ci[0]) {
          this.userCourses[quarter] = Object.keys(ci[0][quarter])
          // this.userCourses[quarter] = Object.keys(ci[0][quarter])
          // .map(course => {
          //   return this.db.getCourseInfo(quarter, course)
          //   .map(c => {
          //
          //     // Firebase ignores empty list attributes, so if people_interested is empty we
          //     // need to manually create it (case 1) else we retrieve it from the DB
          //     var course: Course;
          //     if (c.length == 5) {
          //       course = new Course(c[0], c[1], [], c[2], c[3], c[4]);
          //     }
          //     else {
          //       course = new Course(c[0], c[1], c[2], c[3], c[4], c[5]);
          //     }
          //     return course;
          //   });
          // });
        }

        console.log(this.userCourses);
      });
    }
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
