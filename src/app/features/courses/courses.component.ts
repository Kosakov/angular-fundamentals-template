import { Component, OnInit } from "@angular/core";
import { Course } from "@app/features/courses/interfaces";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesService } from "@app/services/courses.service";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  constructor(
    private CoursesStoreService: CoursesStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private coursesService:CoursesService
  ) {}
  courses: Course[] = [];
  clickedBack: boolean = true;
  searched: any;

  editable = true;
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      let title = params["title"];
      if (title) {
        this.CoursesStoreService.filterCourses(title.split(","))
        this.CoursesStoreService.courses$.subscribe((filteredCourses) => {
          //console.log(filteredCourses);
          if (filteredCourses && filteredCourses.length>0){
            this.courses=filteredCourses; // Handle filtered courses
          }
          else{
            this.router.navigate(['/courses']);
          }
        });
      } else {
        this.loadAllCourses();
      }
    });
  }

  loadAllCourses() {
    this.CoursesStoreService.getAllAuthors();
    this.CoursesStoreService.getAll();
    this.CoursesStoreService.courses$.subscribe((course)=>{
      this.courses=course
    })
    
  }

  handleShowCourse(course: Course) {
    this.clickedBack = false;

    this.router.navigate([`courses/${course.id}`]);
  }

  handleEditCourse(course: Course) {
    //console.log("work")
    this.router.navigate([`courses/edit/${course.id}`]);
  }

  handleDeleteCourse(course: Course) {
    //console.log('Delete course:', course);
  }

  handleBack(): void {
    this.clickedBack = true; // Reset UI state for showing the courses list
    this.router.navigate(["/courses"]);
  }

  handleSearch(event: string): void {
    this.searched = event;
    //console.log(this.searched);
  }
}
