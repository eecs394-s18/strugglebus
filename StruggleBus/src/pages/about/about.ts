import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DatabaseProvider, Quarter, Class, Student } from '../../providers/database/database'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {

	items: Observable< Quarter[] >;
	// classes: Observable < Class[] >;
	quarter: Observable< Quarter >;

	quarterClasses: Observable< Class[] >;
  selectedClass: Class;

  peopleInterested: Observable< Student [] >;
  peopleCollection: AngularFirestoreCollection<Student>;

  constructor(public navCtrl: NavController, public databaseService: DatabaseProvider,
    public navParams: NavParams) {

    // Temp, hard coded to get EECS 394 people
    this.peopleInterested = this.databaseService.peopleInterested;
    this.peopleCollection = this.databaseService.peopleCollection;

    // Get selected class from Home page navigation
    this.selectedClass = navParams.get('data');
    console.log(this.selectedClass);

    // Get people interested for this class


	}

  addStudent(): void {
    // Add a student to people interested
    this.peopleCollection.add({
      id: 3,
      name: "Jackie D"
    })
  }

}
