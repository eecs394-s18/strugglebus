import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider, Course } from '../../providers/database/database'
import { UserProvider } from '../../providers/user/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProfilePage } from '../profile/profile';



@Component({
	selector: 'page-course',
	templateUrl: 'course.html',
})
export class CoursePage implements OnInit {

	quarter: string;
	course: string;
	courseInfo: Observable<any>;
	people_interested: Observable<any[]>;
	friends_interested: any = [];

	hasCourse: boolean;
	user_id: string;
	user_name: string;


	constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider, public userService: UserProvider) {
		this.quarter = navParams.get('quarter');
		this.course = navParams.get('course');
		this.user_id = userService.userData['id'];
		this.user_name = userService.userData['name'];
		// let loader = navParams.get('loader');

	}

	ngOnInit() {

		this.courseInfo = this.db.getCourseInfo(this.quarter, this.course)
			.map(c => {

				// Firebase ignores empty list attributes, so if people_interested is empty we
				// need to manually create it (case 1) else we retrieve it from the DB
				var course: Course;
				if (c.length == 5) {
					course = new Course(c[0], c[1], [], c[2], c[3], c[4]);
				}
				else {
					course = new Course(c[0], c[1], c[2], c[3], c[4], c[5]);
				}

				return course;
			});

		this.people_interested = this.db.getPeopleInterested(this.quarter, this.course)
			.map(people => {

				var interested = []
				this.friends_interested = []

				if(people){
					for (var i = 0; i < Object.keys(people).length; i++) {

						var key = Object.keys(people)[i]

						// check if this is the current user
						if (key == this.user_id) { continue }

						// check if person is FB freind
						if (this.userService.userFriendIDs.indexOf(key) > -1) {
							var user = this.userService.userFriends.filter(user => user.id == key)
							this.friends_interested.push(user[0])

							// not current user and not FB friend
						} else {
							interested.push({ // making sure people_interested has ids
								id: key,
								name: people[key].name,
								picture: this.userService.getUserPictureUrl(key) // Pulling photo from fb api
							})
						}
					}
				}
				return interested;
			});

		// checking if user already has course and accordingly disabling button
		this.db.getUserCourse(this.quarter, this.course, this.user_id)
			.subscribe((res) => {
				if (res === null) {
					this.hasCourse = false
				} else {
					this.hasCourse = true
				}
			});

	}

	addUser(): void {
		this.db.addInterested(this.quarter, this.course, this.user_id, this.user_name);
		this.hasCourse = true;
	}

	removeUser(): void {
		this.db.removeInterested(this.quarter, this.course, this.user_id)
		this.hasCourse = false;
	}

	onFriendClick(friend): void {
		console.log(friend); // debug

		this.navCtrl.push(ProfilePage, {
			user: friend,
			quarter: this.quarter
		});
	}
}
