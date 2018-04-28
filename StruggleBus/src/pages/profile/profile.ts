import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Course, DatabaseProvider } from '../../providers/database/database';
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
  }

  ngOnInit() {
    this.userData = this.db.getUser(this.fbData.id, this.fbData.name);
    console.log(this.fbData);
  }

  onSelect(course: /*Course*/ string): void {
    this.navCtrl.push(CoursePage, {
      quarter: this.quarter,
      course: course
    })
  }

  isString(val): boolean { return typeof val === 'string'; }
  getKeys(obj) {
    let keys = []
    for (let key in obj) {
      keys.push(key);
    }
    return keys;
  }
}
