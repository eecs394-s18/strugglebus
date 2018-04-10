import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	classes: Observable<any[]>;

  constructor(public navCtrl: NavController,  afDB: AngularFireDatabase) {
  	this.classes = afDB.list('quarters').valueChanges();

  }

}
