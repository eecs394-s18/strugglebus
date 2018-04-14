import { NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { TabsPage } from '../../pages/tabs/tabs';
import firebase from 'firebase';


let firebase_test_config = {
  apiKey: "AIzaSyDtDugT9MDUCoXU6juMwBCRyERDKKwyU6o",
    authDomain: "strugglebus-fcaf8.firebaseapp.com",
    databaseURL: "https://strugglebus-fcaf8.firebaseio.com",
    projectId: "strugglebus-fcaf8",
    storageBucket: "strugglebus-fcaf8.appspot.com",
    messagingSenderId: "97540322838"
}

firebase.initializeApp(firebase_test_config)

@Injectable()
export class UserProvider {
  // Check if user logged in, holds user data
  isLoggedIn:boolean = false;
  users:any;

  constructor(private fb: Facebook) {
    fb.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if(res.status === "connect") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));
  }

  // Check if logged in
  checkLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  // Log in and log out methods
  login(navCtrl: NavController) {
    console.log("Login method called");
    // navCtrl.push(TabsPage, {}); // Push to tabs page
    this.fb.login(['public_profile', 'user_friends', 'email'])
        .then(res => {
          // Authenticate with firebase
          // Create credential object to pass to firebase
          const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(res.authResponse.accessToken);

          firebase.auth().signInWithCredential(facebookCredential)
            .then( success => {
              console.log("Firebase success: " + JSON.stringify(success));
              navCtrl.push(TabsPage, {});
            });
          /*
          if(res.status === "connected") {
            this.isLoggedIn = true;
            this.getUserDetail(res.authResponse.userID);
            // Navigate to home page
            navCtrl.push(TabsPage, {});
          } else {
            this.isLoggedIn = false;
          }*/
        })
        .catch(e => console.log('Error logging into Facebook', e));
  }

  logout(navCtrl: NavController) {
    console.log("Logout method called");
    // navCtrl.parent.parent.popToRoot(); // Pop to login page
    this.fb.logout()
        .then( res => {
          this.isLoggedIn = false;
          // Navigate back to login page (root)
          navCtrl.parent.parent.popToRoot();
        })
        .catch(e => console.log('Error logging out of Facebook', e));
  }
  /*
  // FB Graph API call method to get user info
  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
  }*/
}
