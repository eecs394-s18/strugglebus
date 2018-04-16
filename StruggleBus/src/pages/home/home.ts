import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddPage } from '../add/add';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

	addPage = AddPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  addClasses() {
  	console.log("pushing add page");
  	this.navCtrl.push(this.addPage);
  }
  

}
