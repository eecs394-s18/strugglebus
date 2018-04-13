import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DatabaseProvider, Quarter, Course } from '../../providers/database/database'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  	quarters: Observable<any[]>;
  	courses: Observable<any[]>;
  	course: Observable<any>;

  	constructor(public navCtrl: NavController, public db: DatabaseProvider) {

	}

	ngOnInit() {	

		this.quarters = this.db.getQuarters()
			.map(q => {
				return Object.keys(q[0]);
			});
	    	

	    this.courses = this.db.getCourses("2018_spring")
	    	.map (c => {

	    		var courses: any[] = [];
	    		for (var i=0; i < c.length; i++) {
	    			// rebuild the key because lost in map function call
	    			courses.push(c[i]["subject"] + "_" + c[i]["abbv"]);
	    		}

	    		return courses;
	    	});

	    this.course = this.db.getCourses("2018_spring/CONDUCT_323-0")
	    	.map (c => {
	    		let course = new Course(c[0], c[1], c[2], c[3], c[4], []);
	    		return course;
	    	});


	}
}
