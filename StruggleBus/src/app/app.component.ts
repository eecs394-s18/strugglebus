import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { UserProvider } from '../providers/user/user';
import firebase from 'firebase';

// import { Firebase } from '@ionic-native/firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SigninPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    userProvider: UserProvider) {

    let firebase_test_config = {
      apiKey: "AIzaSyDtDugT9MDUCoXU6juMwBCRyERDKKwyU6o",
        authDomain: "strugglebus-fcaf8.firebaseapp.com",
        databaseURL: "https://strugglebus-fcaf8.firebaseio.com",
        projectId: "strugglebus-fcaf8",
        storageBucket: "strugglebus-fcaf8.appspot.com",
        messagingSenderId: "97540322838"
    }

    firebase.initializeApp(firebase_test_config);


    if (!userProvider.checkLoggedIn()) {
      this.rootPage = SigninPage;
    } else {
      this.rootPage = TabsPage;
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
