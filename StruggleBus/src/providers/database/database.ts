import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

export class Quarter {
    year: number;
    season: number;

    constructor(public name) {
    	this.name = name;

      var pieces = name.split('_');
      this.year = parseInt(pieces[1]);

      if (pieces[1] == "fall")        { this.season = 1; }
      else if (pieces[1] == "winter") { this.season = 2; }
      else if (pieces[1] == "spring") { this.season = 3; }
      else                            { this.season = 4; } // summer season



    }
}

export class Course {
    constructor(public abbv, public name,  public people_interested, public school, public subject, public term) {
    	this.abbv = abbv;
    	this.name = name;
    	this.school = school;
    	this.subject = subject;
    	this.term = term;
    	// this.people_interested = people_interested;
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
  		return this.db.list<Course>(path).valueChanges();
  	}

  	getCourseInfo(quarter, course) {
  		let path: string = '/quarters/' + quarter + '/' + course;
  		return this.db.list(path).valueChanges();	
  	}

  	getPeopleInterested(quarter, course) {
  		let path: string = '/quarters/' + quarter + '/' + course + '/people_interested';
  		return this.db.list(path).valueChanges();	
  	}

    checkUserExists(fb_id: string) {
      let path = '/users/'+ fb_id + '/'
      return this.db.list(path).valueChanges()
    }

    // adding user to firebase db
    addUser(fb_id: string, name: string) {
      let path = '/users/'
      let ref = this.db.list(path)
      
      ref.update(fb_id, { name : name })
      .then((res) => {
        console.log("Added user. Res was: "+res)
      })
      .catch((err) => {
        console.error(err)
      })
    }

  	addInterested(quarter, course, id, name) {

      // add User to Course list
  		let path: string = '/quarters/' + quarter + '/' + course + '/people_interested/${id}';
  		const courseRef = this.db.list(path);
  		courseRef.push({ name : name });

      // add Course to User list

  	}

    getUser(id, name) {
      let path: string = `/users/${id}`
      this.db.list(path).valueChanges()
        .subscribe(user => {
              // console.log("user is ", user);
              // console.log("user's type: ", typeof(user));
              // console.log("users keys: ", Object.keys(user));
              // console.log("number users keys: ", Object.keys(user).length);

              // add a new user 
              if (!Object.keys(user).length) {
                
                const userRef = this.db.object(path);
                userRef.set({name: `${name}`});

              }
            
        });
      // now we created the user, or the user already exists
      return this.db.list(path).valueChanges()
    }



}
