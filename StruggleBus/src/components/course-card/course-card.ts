import { Component, Input, OnInit} from '@angular/core';
import { Course } from '../../providers/database/database';

@Component({
  selector: 'course-card',
  templateUrl: 'course-card.html'
})

export class CourseCard implements OnInit {
  @Input() course: Course;
  constructor() {
  }

  ngOnInit(){
  }

}
