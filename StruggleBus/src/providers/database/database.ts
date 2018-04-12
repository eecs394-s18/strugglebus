// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Class {
	id: number;
	name: string;
	people_interested: AngularFirestoreCollection<Student>;
}

export interface Quarter {
	q_name: string;
	classes: Class[];
}

export interface Student {
	id: number;
	name: string;
}

@Injectable()


export class DatabaseProvider {
// a collection of data members (specific things we can call from the database)
// and methods (addQuarter) that interacts with firebase database
	private quartersCollection: AngularFirestoreCollection<Quarter>;
	quarters: Observable< Quarter[] >;

	private quarterDoc: AngularFirestoreDocument<Quarter>;
	quarter: Observable< Quarter >;

	quarterClassesCollection: AngularFirestoreCollection<Class>;
	quarterClasses: Observable< Class[] >;

	// For class eecs394 (doc)
	private classDoc: AngularFirestoreDocument<Class>;
	class: Observable< Class >;
	peopleInterested: Observable< Student [] >;

	peopleCollection: AngularFirestoreCollection<Student>;


	// the actual database that's populated with data (THAT GETS UPDATED ALL THE TIME U)
  	constructor(private afs: AngularFirestore) {
    	console.log('Hello DatabaseProvider Provider');

			// Get collection of quarters
    	this.quartersCollection = afs.collection<Quarter>('quarters');
    	this.quarters = this.quartersCollection.valueChanges();

			// Get document for specific quarter (2018 spr)
    	this.quarterDoc = afs.doc< Quarter >('quarters/2018_spring');
    	this.quarter = this.quarterDoc.valueChanges();

			// Get collection of classes in 2018 spring
    	this.quarterClassesCollection = this.quarterDoc.collection< Class > ('classes');
			this.quarterClasses = this.quarterClassesCollection.valueChanges();

			// Get document for EECS 394
			this.classDoc = afs.doc< Class >('quarters/2018_spring/classes/eecs394');
			this.class = this.classDoc.valueChanges();

			// Get collection of people in EECS 394
			this.peopleCollection = this.classDoc.collection< Student >('people_interested');
			this.peopleInterested = this.peopleCollection.valueChanges();

  	}

  	addQuarter(quarter: Quarter) {
  		this.quartersCollection.add(quarter);
  	}

}
