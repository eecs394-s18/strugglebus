import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

	userData: any;

  	constructor(public navCtrl: NavController, public userService: UserProvider) {

  		this.userData = userService.userData;
  	}

  logout() {
    this.userService.logout(this.navCtrl);
  }
}
