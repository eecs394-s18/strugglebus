import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddPage } from '../add/add';

import { UserProvider } from '../../providers/user/user';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  addPage = AddPage;
  userData: any;
  userCourses: Observable< any[] >;
  userFriends: any[];


  constructor(public navCtrl: NavController, public navParams: NavParams, userService: UserProvider, db: DatabaseProvider) {

  	this.userData = userService.userData;
    if (this.userData) {
      this.userCourses = db.getUser(this.userData['id'], this.userData['name']);
    }
    
    this.userFriends = userService.userFriends;
    console.log("this.usersFriends length is ", this.userFriends.length);
  } 


  addClasses() {
  	this.navCtrl.push(this.addPage);
  }
  

}
