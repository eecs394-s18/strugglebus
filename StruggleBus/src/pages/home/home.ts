import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddPage } from '../add/add';


import { UserProvider } from '../../providers/user/user'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  addPage = AddPage;
  userData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, userService: UserProvider) {

  	this.userData = userService.userData;

  }


  addClasses() {
  	this.navCtrl.push(this.addPage);
  }
  

}
