import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

	userData: any;
  public unregisterBackButtonAction: any; // callback of the event handler to unsubscribe to it when leaving this page

  	constructor(public navCtrl: NavController, public userService: UserProvider, public platform: Platform) {

  		this.userData = userService.userData;
  	}

  logout() {
    this.userService.logout(this.navCtrl);
  }

  ionViewDidEnter() {
    this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  public initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
       console.log('Entered')
      });
  }

  private customHandleBackButton(): void {
    // do what you need to do here ...
  }
}
