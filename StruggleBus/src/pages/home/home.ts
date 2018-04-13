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

  	quarters: Observable<any[]>;
  	courses: Observable<any[]>;
  	course: Observable<any>;

    aboutPage = AboutPage;
  	constructor(public navCtrl: NavController, public db: DatabaseProvider) {

	}


	ngOnInit() {

		this.quarters = this.db.getQuarters()
			.map(q => {
				return Object.keys(q[0]);
			});
	}

	
  onSelect(quarter: String) : void {
    this.navCtrl.push(this.aboutPage, {
      quarter: quarter
    })
  }
}
