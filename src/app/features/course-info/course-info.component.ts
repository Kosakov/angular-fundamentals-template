import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '@shared/components/course-card/interfaces';
 

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

