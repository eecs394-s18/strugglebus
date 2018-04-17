import { NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { TabsPage } from '../../pages/tabs/tabs';
import firebase from 'firebase';


// let firebase_test_config = {
//   apiKey: "AIzaSyDtDugT9MDUCoXU6juMwBCRyERDKKwyU6o",
//     authDomain: "strugglebus-fcaf8.firebaseapp.com",
//     databaseURL: "https://strugglebus-fcaf8.firebaseio.com",
//     projectId: "strugglebus-fcaf8",
//     storageBucket: "strugglebus-fcaf8.appspot.com",
//     messagingSenderId: "97540322838"
// }
//
// firebase.initializeApp(firebase_test_config)

@Injectable()
export class UserProvider {
  // Check if user logged in, holds user data

  verbose: boolean = false;

  isLoggedIn:boolean = false;
  users:any;
  userData: any;
  userPath: string;

  userFriendIDs: any;
  userFriends: any[] = [];

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
    
    if (this.verbose) console.log("Login method called");

    this.fb.login(['public_profile', 'user_friends', 'email'])
        .then(response => {
          // Authenticate with firebase
          // Create credential object to pass to firebase
          const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);
          
          if (this.verbose) console.log("FB Credential: " + facebookCredential);

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

                             navCtrl.push(TabsPage, {});
                          });

              this.getUserFriends();
              // this.getUserFriendsInfo()

            });
          
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

  getUserFriends() {
    this.fb.api('/me/friends?fields=uid', [])
           .then(response => {
               var ids = [response['data'].map(id => id['id'])];
               return ids;
           })
           .then(ids => {
                          
             this.userFriendIDs = ids;

             for (var i=0; i < ids.length; i++) {
                 
               var path = '/' + ids[i];
               this.fb.api(path, [])
                      .then(profile => {

                        var friendData = { 
                             id: ids[i],
                             name: profile['name']
                        };

                        console.log("path ", path + '/picture?redirect=0');
                        this.fb.api(path + '/picture?redirect=0', [])
                             .then(data => {

                                  console.log("data keys are: ", Object.keys(data));
                                  friendData['picture'] = data['data']['url'];
                                  console.log("adding url to data ", friendData['picture']);

                              })
                              .catch(e => console.log("Error getting user's picture", e));

                        this.userFriends.push(friendData);

                    })
                    .catch(e => console.log("Error getting user's friend's information", e));
             }

           })
           .catch(e => console.log("Error geting user's friends", e));;
     
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
