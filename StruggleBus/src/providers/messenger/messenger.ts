import { Injectable } from '@angular/core';
// import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { Device } from '@ionic-native/device';

/*
  Generated class for the MessengerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessengerProvider {

  constructor(/*private iab: InAppBrowser*/) {
    console.log('Hello MessengerProvider Provider');
  }

  openMessenger(person_id: string) {
    console.log("openMessenger function called with id ", person_id) // debug
    // const browser = new InAppBrowser().create(`https://m.me/${person_id}`);
    new InAppBrowser().create(`https://www.facebook.com/profile.php?id=${person_id}`)
  }

}
