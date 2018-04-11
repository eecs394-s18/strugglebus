// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


export interface Class {
	id: number;
	name: string;
	people_interested: number[];
}


export interface Quarter {
	q_name: string;
	classes: Class[];
}


@Injectable()


export class DatabaseProvider {
// a collection of data members (specific things we can call from the database)
// and methods (addQuarter) that interacts with firebase database
	private quartersCollection: AngularFirestoreCollection<Quarter>;
	quarters: Observable< Quarter[] >;


	private quarterDoc: AngularFirestoreDocument<Quarter>;
	quarter: Observable< Quarter >;

	quarterClasses: Observable< Class[] >;



// the actual database that's populated with data (THAT GETS UPDATED ALL THE TIME U)
  	constructor(private afs: AngularFirestore) {
    	console.log('Hello DatabaseProvider Provider');
    	this.quartersCollection = afs.collection<Quarter>('quarters');
    	this.quarters = this.quartersCollection.valueChanges();

    	this.quarterDoc = afs.doc< Quarter >('quarters/2018_spring/classes/eecs394');
    	this.quarter = this.quarterDoc.valueChanges();

    	this.quarterClasses = this.quarterDoc.collection< Class > ('classes').valueChanges();
  	}


  	addQuarter(quarter: Quarter) {
  		this.quartersCollection.add(quarter);
  	}


		addStudent(student_in_class: Student_in_class) {
			this.quartersCollection.add(student_in_class);
		}
}