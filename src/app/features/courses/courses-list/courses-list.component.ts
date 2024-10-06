import { Component,OnInit,Output,Input,EventEmitter} from '@angular/core';
import { Course } from '@app/features/courses/interfaces';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
 

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  faTrashCan=faTrashCan
  faPen=faPen
  @Input() courses!:Course[]|null
  @Input() editable!: boolean;
  @Output() showCourse = new EventEmitter<Course>();
  @Output() editCourse=new EventEmitter<Course>()
  @Output() deleteCourse=new EventEmitter<Course>()


  handleShow(course: Course) {
    this.showCourse.emit(course);
  }

  handleEdit(course: Course) {
    this.editCourse.emit(course);
  }

  handleDelete(course: Course) {
    this.deleteCourse.emit(course);
  }

}
