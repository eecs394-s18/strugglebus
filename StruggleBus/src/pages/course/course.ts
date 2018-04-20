import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider, Course } from '../../providers/database/database'
import { UserProvider } from '../../providers/user/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
  
  

@Component({
  selector: 'page-course',
  templateUrl: 'course.html',
})
export class CoursePage implements OnInit {

	quarter: string;
	course: string;
	courseInfo: Observable<any>;
	people_interested: Observable<any[]>;
  friends_interested: any;

	hasCourse: boolean;
  user_id: string;
  user_name: string;
	

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider, userService: UserProvider) {
		this.quarter = navParams.get('quarter');
		this.course = navParams.get('course');
    this.user_id = userService.userData['id'];
    this.user_name = userService.userData['name'];
		// let loader = navParams.get('loader');
		
  }

  ngOnInit () {

  	this.courseInfo = this.db.getCourseInfo(this.quarter, this.course)
  		.map(c => {


  			// Firebase ignores empty list attributes, so if people_interested is empty we 
  			// need to manually create it (case 1) else we retrieve it from the DB
  			var course: Course; 
  			if (c.length == 5) {
  				course = new Course(c[0], c[1], [], c[2], c[3], c[4]);
  			}
  			else {
  				course = new Course(c[0], c[1], c[2], c[3], c[4], c[5]);
  			}
  			
  			return course;
  		});

			this.people_interested = this.db.getPeopleInterested(this.quarter, this.course)
			.map(people => {
				return people;
			});

			// checking if user already has course and accordingly disabling button
			this.db.getUserCourse(this.quarter, this.course, this.user_id)
			.subscribe((res) => {
				if (res === null) {
					this.hasCourse = false
				} else{
					this.hasCourse = true
				}
			})
															
			this.people_interested.subscribe(people => {
				for (var i=0; i < people.length; i++) {
					if ( people[i].name == this.user_id) {  this.hasCourse = true; }
				}
    });


  }

  addUser(): void {
		this.db.addInterested(this.quarter, this.course, this.user_id, this.user_name);
		this.hasCourse = true;
	}
	
	removeUser(): void {
		this.db.removeInterested(this.quarter, this.course, this.user_id)
		this.hasCourse = false;
	}
}
