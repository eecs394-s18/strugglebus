import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DatabaseProvider, Quarter, Class } from '../../providers/database/database'



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

	items: Observable< Quarter[] >;
	// classes: Observable < Class[] >;
	quarter: Observable< Quarter >;

	quarterClasses: Observable< Class[] >;




  // constructor(public navCtrl: NavController,  private db: AngularFirestore) {
  constructor(public navCtrl: NavController, public databaseService: DatabaseProvider) {
  		this.items = this.databaseService.quarters;
  		// this.classes = this.databaseService.classes;

  		this.quarter = this.databaseService.quarter;

  		this.quarterClasses = this.databaseService.quarterClasses;
	}



  ionViewWillLoad() {

  }

}
