import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { TabsPage } from '../../pages/tabs/tabs';
import { DatabaseProvider } from "../../providers/database/database";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userProvider: UserProvider, public loadingCtrl: LoadingController, public db: DatabaseProvider) {
  }

  login() {
    let loading = this.loadingCtrl.create({
        content: 'One moment please...'
    });

    loading.present();
    this.userProvider.login(this.navCtrl, loading);

  }

  bypassLogin() {
    this.navCtrl.push(TabsPage,{}); //Go directly to homepage without logging in

    // for debugging
    this.db.debug()
  }
}
