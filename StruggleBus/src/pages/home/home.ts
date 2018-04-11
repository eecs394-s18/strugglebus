import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DatabaseProvider, Quarter } from '../../providers/database/database'



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

	items: Observable< Quarter[] >;

 
 

  // constructor(public navCtrl: NavController,  private db: AngularFirestore) {
  constructor(public navCtrl: NavController, public databaseService: DatabaseProvider) {
  	this.items = this.databaseService.quarters;
	}



  ionViewWillLoad() {

  }

}
