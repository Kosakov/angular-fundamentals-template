import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Course } from '@app/features/courses/interfaces';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent{

  @Input() course!:Course
  @Output() clickOnShow=new EventEmitter<MouseEvent>()
  buttonText="Show Course"
  @Input() editable!:boolean


  onShowMoreInfo(e:MouseEvent) {
    this.clickOnShow.emit(e); 
  }
}


