import { NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { TabsPage } from '../../pages/tabs/tabs';
import firebase from 'firebase';

import { DatabaseProvider } from "../database/database"


@Injectable()
export class UserProvider {

  verbose: boolean = false;

  isLoggedIn:boolean = false;
  users:any;
  userData: any;
  userPath: string;

  userFriendIDs: any;
  userFriends: any[] = [];

  constructor(private fb: Facebook) {
    // checks whether the user is logged in or not, and initialises this.isLoggedIn accordingly
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
  login(navCtrl: NavController, loading) {
    
    if (this.verbose) console.log("Login method called");

    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then(response => {
      
      // Authenticate with firebase
      // Create credential object to pass to firebase
      const facebookCredential = firebase.auth.FacebookAuthProvider
      .credential(response.authResponse.accessToken);
      
      if (this.verbose) {
        console.log("FB Credential: " + facebookCredential);
      }

      firebase.auth().signInWithCredential(facebookCredential)
      .then( success => {
        
        if (this.verbose) console.log("Firebase success: " + JSON.stringify(success));
        
        this.fb.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', [])
        .then(profile => {
          this.userData = { 
            id: profile['id'],
            email: profile['email'], 
            first_name: profile['first_name'], 
            last_name: profile['last_name'], 
            picture: profile['picture_large']['data']['url'], 
            username: profile['name']
          };

          this.userData['name'] = this.userData['first_name'] + " " + this.userData['last_name'];
          this.userPath = '/users/' + profile['id'];
          this.getUserFriends()
          .then(() => {
            loading.dismiss();
            navCtrl.push(TabsPage, {});
          })
        })
        // .then(() => {
        //   loading.dismiss();
        //   navCtrl.push(TabsPage, {});
        // });
      });      
    })
    .catch(e => {
      console.log('Error logging into Facebook', e);
      loading.dismiss(); // get rid of the loader if you cancelled login
    });
  }

  logout(navCtrl: NavController) {
    if (this.verbose) console.log("Logout method called");
    this.fb.logout()
        .then( res => {
          this.isLoggedIn = false;
          // Navigate back to login page (root)
          navCtrl.parent.parent.popToRoot();
        })
        .catch(e => console.log('Error logging out of Facebook', e));
  }

  getUserFriends() {
    return this.fb.api('/me/friends?fields=uid', [])
    .then(response => {
      var ids = [response['data'].map(id => id['id'])];
      return ids;
    })
    .then(ids => {
      this.userFriends = [] // resetting to prevent duplication
      ids = ids[0];
      this.userFriendIDs = ids;
      for (var i=0; i < ids.length; i++) {
        if (this.verbose)  console.log("trying to get friends info for id: ", ids[i]);
        
        var path = '/' + ids[i];
        
        if (this.verbose) console.log("with path ", path);
        
        this.fb.api(path, [])
        .then(profile => {

          var friendData = { 
            id: ids[i],
            name: profile['name']
          };

          if (this.verbose) console.log("path ", path + '/picture?redirect=0');
          this.fb.api(path + '/picture?redirect=0', [])
          .then(data => {

            if (this.verbose) console.log("data keys are: ", Object.keys(data));
            friendData['picture'] = data['data']['url'];
            if (this.verbose) console.log("adding url to data ", friendData['picture']);

          })
          .catch(e => console.log("Error getting user's picture", e));

          this.userFriends.push(friendData)

        })
        .catch(e => console.log("Error getting user's friend's information", e));
      
      }
    })
    .catch(e => console.log("Error geting user's friends", e));
    
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
