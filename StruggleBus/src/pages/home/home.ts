import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DatabaseProvider, Quarter, Course } from '../../providers/database/database'

import {AboutPage} from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  quarters: string[];
  aboutPage = AboutPage;
    
  constructor(public navCtrl: NavController, public db: DatabaseProvider) {}

	ngOnInit() {
		this.db.getQuarters()
			.subscribe(q => {
        this.quarters = Object.keys(q[0]); // q is an array of one object of key 0. console.log for details
			});
	}

  onSelect(quarter: String) : void {
    this.navCtrl.push(this.aboutPage, {
      quarter: quarter
    });
  }
}
