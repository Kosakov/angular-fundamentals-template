import {  Component, OnInit } from "@angular/core";
import { Course } from "@app/features/courses/interfaces";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { Observable } from "rxjs";

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
    public  coursesFacade: CoursesStateFacade,
  ) {}
  courses: Course[] = [];
  clickedBack: boolean = true;
  searched: any;
  editable = true;
  courses$!: Observable<Course[]>;
  ngOnInit() {
    this.courses$ = this.coursesFacade.allCourses$;

    
    this.route.queryParams.subscribe((params) => {
      let title = params["title"];
      if (title) {
        this.coursesFacade.getFilteredCourses(title)
      } else {
        this.loadAllCourses();
      }
    });
  }

  loadAllCourses() {
    this.coursesFacade.getAllCourses();
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
    if (course.id){
      this.coursesFacade.deleteCourse(course.id)
      this.courses = this.courses.filter((courseHave) => courseHave.id !== course.id);
    }
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
