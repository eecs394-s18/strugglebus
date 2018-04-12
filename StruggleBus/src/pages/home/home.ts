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

	quarter: Observable< Quarter >;
  quarterClasses: Observable < Class[] >;
	quarterClassesCollection: AngularFirestoreCollection< Class >;
  // classDocs: AngularFirestoreDocument< Class[] >;

  constructor(public navCtrl: NavController, public databaseService: DatabaseProvider) {
    // Get current quarter (2018 spring by default) and classes, from DB service
  	this.quarter = this.databaseService.quarter;
    this.quarterClasses = this.databaseService.quarterClasses;
  	this.quarterClassesCollection = this.databaseService.quarterClassesCollection;

	}

  /*
  getClassDocs(): void {
    // Get an array of all classes (documents) to populate list
    this.quarterClassesCollection.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        classDocs.push(doc);
      })
    })
  }
  */

  onSelect(myClassDoc: AngularFirestoreDocument<Class>): void {
    // Navigate to class list based on which class was selected
    console.log(myClassDoc);
    // this.navCtrl.push -> change navigation to (this_page, with_this_data)
    this.navCtrl.push(this.aboutPage, {
      data: myClassDoc
    });
  }

  ionViewWillLoad() {

  }

}
