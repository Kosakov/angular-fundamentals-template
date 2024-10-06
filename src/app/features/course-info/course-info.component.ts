import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Course } from "@app/features/courses/interfaces";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
  backButton: string = "Back";
  currentCourse: Course | null = null;

  @Output() backButtonPressed = new EventEmitter<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesFacade: CoursesStateFacade
  ) {}
  ngOnInit(): void {
    // Get course id from the route parameter
    let courseId = this.route.snapshot.paramMap.get("id");

    if (courseId) {
      this.coursesFacade.course$.subscribe((course) => {
        if (course) {
          this.currentCourse = course;
        }
      });
      this.coursesFacade.getSingleCourse(courseId);
    }
  }

  handleBAck(): void {
    this.router.navigate(["/courses"]);
  }
}
