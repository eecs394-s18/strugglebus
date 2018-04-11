import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DatabaseProvider, Quarter, Class, Student } from '../../providers/database/database'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  aboutPage = AboutPage;

	items: Observable< Quarter[] >;
	// classes: Observable < Class[] >;
	quarter: Observable< Quarter >;

	quarterClasses: Observable< Class[] >;

  peopleInterested: Observable< Student [] >;
  peopleCollection: AngularFirestoreCollection<Student>;



  // constructor(public navCtrl: NavController,  private db: AngularFirestore) {
  constructor(public navCtrl: NavController, public databaseService: DatabaseProvider) {

      this.items = this.databaseService.quarters;
  		this.quarter = this.databaseService.quarter;
  		this.quarterClasses = this.databaseService.quarterClasses;

	}




  ionViewWillLoad() {

  }

}
