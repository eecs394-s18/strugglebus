import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DatabaseProvider } from '../../providers/database/database';
import { CoursePage } from '../course/course';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {

  userData: any;
  userCourses: any[];
  fbData: any;
  quarter: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserProvider, public db: DatabaseProvider) {
    this.fbData = navParams.get('user');
    this.quarter = navParams.get('quarter');
    // this.userData = userService.userData;
  }

  ngOnInit() {
    this.db.getUser(this.fbData.id, this.fbData.name)
      .subscribe(user => {
        this.userData = user;
        this.userCourses = []; // important, list doesn't render without this line
        let quarters = user['courses_interested']
        for (let q in quarters) {
          this.userCourses[q] = Object.keys(quarters[q])
        }
      })
    console.log(this.fbData);
  }

  onSelect(course: /*Course*/ string): void {
    this.navCtrl.push(CoursePage, {
      quarter: this.quarter,
      course: course
      // course: course.subject + '_' + course.abbv
    })
  }
}
