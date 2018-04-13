import { Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DatabaseProvider } from '../../providers/database/database'
import {CoursePage} from '../course/course';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage implements OnInit {

  quarter: string;
  courses: Observable<any[]>;

  coursePage = CoursePage;

  constructor(public navCtrl: NavController, public db: DatabaseProvider,
    public navParams: NavParams) {
     
      this.quarter = navParams.get('quarter');
  }

  ngOnInit(){
    this.courses = this.db.getCourses(this.quarter)
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

  onSelect(course: String) : void {
    this.navCtrl.push(this.coursePage, {
      quarter: this.quarter,
      course: course
    })
  }

}
