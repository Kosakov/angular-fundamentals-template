import { Component, OnInit} from '@angular/core';
import { Course } from '@app/features/courses/interfaces';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';




@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})


export class CoursesComponent implements OnInit{
  constructor(private CoursesStoreService:CoursesStoreService,private router:Router,private location:Location){}
  //courses:Course[]=mockedCoursesList
  courses:any[]=[]
  clickedBack:boolean=true;
  searched: any;

  editable = true; 
  ngOnInit(){
    this.CoursesStoreService.getAllAuthors()
    this.CoursesStoreService.getAll(); 

    this.CoursesStoreService.courses$.subscribe((courses) => {
      this.courses = courses;
  });
 
  }



  handleShowCourse(course: Course) {
    this.clickedBack=false
    console.log(course.id)
    this.router.navigate([`courses/${course.id}`]);

  }

  handleEditCourse(course: Course) {
    //console.log('Edit course:', course);
    
  }

  handleDeleteCourse(course: Course) {
    //console.log('Delete course:', course);
    
  }

  handleBack():void {
    this.clickedBack = true; // Reset UI state for showing the courses list
    this.router.navigate(['/courses']);
    
  }

  handleSearch(event: string): void {
    this.searched = event;
    //console.log(this.searched);
  }




}


