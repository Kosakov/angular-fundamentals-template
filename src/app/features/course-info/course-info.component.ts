import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '@app/features/courses/interfaces';
 import {mockedCoursesList,mockedAuthorsList} from '@shared/mocks/mock'


@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  backButton:string="Back"
  
  @Input() course!:Course
  @Output() backButtonPressed=new EventEmitter<boolean>()


  handleBAck(isClicked: boolean) {
    this.backButtonPressed.emit(isClicked);
  }



  
}

