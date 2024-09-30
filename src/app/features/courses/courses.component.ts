import { Component, OnInit} from '@angular/core';
import {mockedCoursesList} from '@shared/mocks/mock'
import { Course } from '@app/features/courses/interfaces';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { OnInitEffects } from '@ngrx/effects';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})


export class CoursesComponent implements OnInit{
  constructor(private CoursesStoreService:CoursesStoreService){}
  //courses:Course[]=mockedCoursesList
  courses:any[]=[]
  selectedCourse: any;
  clickedBack:boolean=true;
  searched: any;

  editable = true; 
  ngOnInit(){
    this.CoursesStoreService.getAll(); 
    this.CoursesStoreService.courses$.subscribe((courses) => {
      this.courses = courses;
  });
 
  }



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


