import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DatabaseProvider, Quarter, Class, Student } from '../../providers/database/database'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {

  items: Observable<Quarter[]>;
  // classes: Observable < Class[] >;
  quarter: Observable<Quarter>;

  quarterClasses: Observable<Class[]>;
  selectedClass: Class;

  peopleInterested: Observable<Student[]>;
  peopleCollection: AngularFirestoreCollection<Student>;


  constructor(public navCtrl: NavController, public databaseService: DatabaseProvider,
    public navParams: NavParams, public afs: AngularFirestore) {

    // Temp, hard coded to get EECS 394 people
    this.peopleInterested = this.databaseService.peopleInterested;
    this.peopleCollection = this.databaseService.peopleCollection;
    this.isInClass = false;
    this.buttonText = "Join Class";
    // Get selected class from Home page navigation
    this.selectedClass = navParams.get('data');
    console.log(this.selectedClass);

    // Get people interested for this class

    // Check if [MY_NAME] already exists in the class
    afs.collection<>('/quarters/2018_spring/classes/eecs394/people_interested').valueChanges().map(res=>{
        return res.filter((person) => person.name == "Jackie D")
    }).subscribe(res => {
        if (res.length > 0) { this.isInClass = true } else { this.isInClass = false }
    })


    // change button text based on whether you're in the class or not



  }



  addStudent(): void {
    // Add a student to people interested if not in class already
    console.log(this.buttonText)

    // Shows a different text after clicking but kind of buggy & no remove functionality
  //   if (this.isInClass) {
  //   this.buttonText = "Remove me from Class";
  // }

    // if (this.isInClass == false) {
    this.peopleCollection.add({
      id: 3,
      name: "Jackie D"
    })
  // }
  }

}
