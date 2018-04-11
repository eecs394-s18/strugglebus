import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  class: Observable< Class >;

  peopleInterested: Observable< Student [] >;
  peopleCollection: AngularFirestoreCollection<Student>;

  constructor(public navCtrl: NavController, public databaseService: DatabaseProvider) {
  		this.items = this.databaseService.quarters;
  		this.quarter = this.databaseService.quarter;
  		this.quarterClasses = this.databaseService.quarterClasses;

      this.peopleInterested = this.databaseService.peopleInterested;
      this.peopleCollection = this.databaseService.peopleCollection;

      this.class = this.databaseService.class;
	}

  addStudent(): void {
    this.peopleCollection.add({
      id: 3,
      name: "Jackie D"
    })
  }

}
