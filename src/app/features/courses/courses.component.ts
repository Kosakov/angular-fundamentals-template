import { Component} from '@angular/core';
import {mockedCoursesList} from '@shared/mocks/mock'
import { Course } from '@app/features/courses/interfaces';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})


export class CoursesComponent{
  courses:Course[]=mockedCoursesList
  selectedCourse: any;
  clickedBack:boolean=true;
  searched: any;

  editable = true; 

  handleShowCourse(course: Course) {
    this.selectedCourse = course;
    this.clickedBack=false
    //console.log('Show course:', course);
    
  }

  handleEditCourse(course: Course) {
    //console.log('Edit course:', course);
    
  }

  handleDeleteCourse(course: Course) {
    //console.log('Delete course:', course);
    
  }

  handleBack(isclicked:any):void {
    this.clickedBack=isclicked
    //console.log(isclicked)
    
  }

  handleSearch(event: string): void {
    this.searched = event;
    //console.log(this.searched);
  }




}


