// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

// export interface Class {
// 	id: number;
// 	name: string;
// 	people_interested: AngularFirestoreCollection<Student>;
// }

// export interface Quarter {
// 	name: string;
// 	// classes: Class[];
// }

// export interface Student {
// 	id: number;
// 	name: string;
// }

export class Quarter {
    constructor(public name) {
    	this.name = name;
    }
}	

export class Course {
    constructor(public id, public name, public people_interested) {
    	this.id = id;
    	this.name = name;
    	this.people_interested = people_interested;
    }
}	


@Injectable()


export class DatabaseProvider {

	// public quarters: FirebaseListObservable<Quarter[]>;


  	constructor(private db: AngularFireDatabase) {

  		console.log("database initalized");	
  		
  	}


  	getQuarters() {
  		return this.db.list('/').valueChanges();
  	}


 
  	getCourses(quarter) {
  		let path: string = '/quarters/' + quarter;
  		return this.db.list(path).valueChanges();	
  	}


}
