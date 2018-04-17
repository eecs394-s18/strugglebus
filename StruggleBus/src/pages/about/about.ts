import { Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database'
import { CoursePage } from '../course/course';
import { Course } from "../../providers/database/database";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage implements OnInit {

  quarter: string;
  courses: Course[];
  filteredItems: Course[];
  searchTerm: string;
  coursePage = CoursePage;

  constructor(public navCtrl: NavController, public db: DatabaseProvider,
    public navParams: NavParams) {
     
      this.quarter = navParams.get('quarter');
  }

  ngOnInit(){
    this.db.getCourses(this.quarter)
    .subscribe(courses => {
      this.courses = courses;
      this.filteredItems = courses;
    });
  }

  onSearch($event: any): void {
    this.filteredItems = this.courses;

    if (this.searchTerm && this.searchTerm.trim() != '') { // null check
      this.filteredItems = this.filteredItems.filter((course) => {
        let title = course.subject + ' ' + course.abbv; // construct string title
        return title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    }

  }

  onCancel($event: any) {
    this.filteredItems = this.courses;
  }

  onSelect(course: Course) : void {

    this.navCtrl.push(this.coursePage, {

      quarter: this.quarter,
      course: course.subject+'_'+course.abbv
    })

  }

}
