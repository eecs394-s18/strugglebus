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

    aboutPage = AboutPage;
  	constructor(public navCtrl: NavController, public db: DatabaseProvider) {

	}


	ngOnInit() {

		this.quarters = this.db.getQuarters()
			.map(q => {
				return Object.keys(q[0]);
			});


	    this.courses = this.db.getCourses("2018_spring")
	    	.map (c => {
	    		console.log(c);


	    		var courses: any[] = [];

	    		for (var i=0; i < c.length; i++) {
	    			// rebuild the key because lost in map function call
	    			courses.push(c[i]["subject"] + "_" + c[i]["abbv"]);
	    		}

	    		return courses;
	    	});
	}
  onSelect(quarter: String) : void {
    this.navCtrl.push(this.aboutPage, {
      quarter: quarter
    })
  }
}
