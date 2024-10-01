import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '@app/features/courses/interfaces';
import { CoursesStoreService } from '@app/services/courses-store.service';


@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent  implements OnInit{
  backButton:string="Back"
  currentCourse :Course|null=null
  
  @Output() backButtonPressed=new EventEmitter<boolean>()

  constructor(private route:ActivatedRoute,private coursesStoreService: CoursesStoreService,private router:Router){}
  ngOnInit(): void {
    // Get course id from the route parameter
    let courseId = this.route.snapshot.paramMap.get('id');

    if (courseId) {
      // Call service to fetch the course by id
      this.coursesStoreService.getCourse(courseId);
    
      // Subscribe to the course$ observable to get the course data
      this.coursesStoreService.course$.subscribe((course) => {
        this.currentCourse  = course;
      });
    }
  }
  


  handleBAck():void {
    this.router.navigate(["/courses"])
  }



  
}

