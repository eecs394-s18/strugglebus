import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SearchPage } from '../search/search';
import { ProfilePage } from '../profile/profile';
import { QuarterPipe } from '../../pipes/quarter/quarter';
import { UserProvider } from '../../providers/user/user';
import { DatabaseProvider, Quarter } from '../../providers/database/database';
import { PipesModule} from '../../pipes/pipes.module'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Course } from "../../providers/database/database";
import { CoursePage } from '../course/course';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [QuarterPipe]
})
export class HomePage implements OnInit {

  searchPage = SearchPage;
  userData: any;
  // userCourses: Course[]
  userCourses: any[]
  userFriends: any[];
  quarters: Quarter[];
  currentQuarter: string;
  debug: boolean = false

  constructor(public navCtrl: NavController, public navParams: NavParams, userService: UserProvider, public db: DatabaseProvider) {

    this.userData = userService.userData;

    this.userFriends = userService.userFriends;
    console.log("this.usersFriends length is ", this.userFriends.length);

  }

  ngOnInit() {
    this.db.getQuarters()
      .subscribe(q => {
        // if (this.debug) console.log("Output of getQuarters is: ", JSON.stringify(q));
        this.quarters = Object.keys(q[0]).map(q => new Quarter(q)); // q is an array of one object of key 0. console.log for details
        this.currentQuarter = this.quarters[0].name;
      });

    if (this.userData) {
      this.db.getUser(this.userData['id'], this.userData['name'])
      .subscribe(ci => {
        // if (this.debug) console.log("Output of getUser is: ", JSON.stringify(ci));
        // fyi:
        // ci  = {
        //   'courses_interested':{
        //     '2018_spring': {'course1':0, 'course2':0,...},
        //     '2018_winter': ...
        //   }
        // },

        this.userCourses = []; // important, list doesn't render without this line
        let quarters = ci['courses_interested']
        for (let quarter in quarters) {
          this.userCourses[quarter] = Object.keys(quarters[quarter])
          // .map(courseName => {
          //   if (this.debug) console.log("courseName taken is", courseName)
          //   return this.db.getCourseInfo(quarter, courseName)
          //   // .subscribe(courseInfo => {
          //   //   if (this.debug) console.log("courseInfo gotten is", JSON.stringify(courseInfo))
          //   // })
          //   .map(c => {
          //     if (this.debug) console.log("courseInfo gotten is", JSON.stringify(c))
          //     return new Course(c[0], c[1], [2], c[3], c[4], c[5])
          //   })
          // })
        }

        if (this.debug) console.log("this.userCourses is: ", JSON.stringify(this.userCourses));
      });
    }
  }


  addClasses() {
  	this.navCtrl.push(this.searchPage,  {
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

  onSelect(course: /*Course*/ string): void {
    this.navCtrl.push(CoursePage, {
      quarter: this.currentQuarter,
      course: course
      // course: course.subject + '_' + course.abbv
    })
  }

  onFriendSelect(friend): void /*Friend data obj, user.ts:126*/ {
    this.navCtrl.push(ProfilePage, {
      //Consider including all quarters, for now we show selected quarter.
      quarter: this.currentQuarter,
      user: friend
    })
  }


}
