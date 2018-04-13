// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

export class Quarter {
    constructor(public name) {
    	this.name = name;
    }
}	

export class Course {
    constructor(public abbv, public name, public school, public subject, public term, public people_interested) {
    	this.abbv = abbv;
    	this.name = name;
    	this.school = school;
    	this.subject = subject;
    	this.term = term;
    	this.people_interested = people_interested;
    }
}	


@Injectable()
export class DatabaseProvider {

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

  	getCourseInfo(quarter, course) {
  		let path: string = '/quarters/' + quarter + '/' + course;
  		return this.db.list(path).valueChanges();	
  	}




}
