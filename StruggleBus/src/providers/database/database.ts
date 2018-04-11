import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


export interface Class {
	id: number;
	name: string;
	people_interested: number[];
}


export interface Quarter {
	name: string;
	classes: Class[];
}


@Injectable()
export class DatabaseProvider {

	private quartersCollection: AngularFirestoreCollection<Quarter>;
	quarters: Observable< Quarter[] >;

	// private 


  	constructor(private afs: AngularFirestore) {
    	console.log('Hello DatabaseProvider Provider');
    	this.quartersCollection = afs.collection<Quarter>('quarters');
    	this.quarters = this.quartersCollection.valueChanges();
  	}


  	addQuarter(quarter: Quarter) {
  		this.quartersCollection.add(quarter);
  	}
}
