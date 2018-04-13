import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider, Course } from '../../providers/database/database'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/**
 * Generated class for the CoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-course',
  templateUrl: 'course.html',
})
export class CoursePage implements OnInit {

	quarter: string;
	course: string;
  	courseInfo: Observable<any>;
  	people_interested: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider) {

  		this.quarter = navParams.get('quarter');
  		this.course = navParams.get('course');
  }

  ngOnInit () {

  	this.courseInfo = this.db.getCourseInfo(this.quarter, this.course)
  		.map(c => {
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


  }

  addStudent(course: string): void {
    this.db.addInterested(this.quarter, course, "name");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursePage');
  }

}
