import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database'

import {AboutPage} from '../about/about';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})

export class AddPage implements OnInit {

  quarters: string[];
  aboutPage = AboutPage;
    
  constructor(public navCtrl: NavController, public db: DatabaseProvider) {}

	ngOnInit() {
		this.db.getQuarters()
			.subscribe(q => {
        this.quarters = Object.keys(q[0]); // q is an array of one object of key 0. console.log for details
			});
	}

  onSelect(quarter: String) : void {
    this.navCtrl.push(this.aboutPage, {
      quarter: quarter
    });
  }
}
