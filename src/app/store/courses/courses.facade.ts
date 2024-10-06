// src/app/store/courses/courses.facade.ts
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import {
  isAllCoursesLoadingSelector,
  isSingleCourseLoadingSelector,
  isSearchingStateSelector,
  getAllCourses,
  getCourse,
  getErrorMessage,
} from './courses.selectors';
import { Observable } from 'rxjs';
import { Course } from '@app/features/courses/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CoursesStateFacade {
  isAllCoursesLoading$: Observable<boolean> = this.store.pipe(select(isAllCoursesLoadingSelector));
  isSingleCourseLoading$: Observable<boolean> = this.store.pipe(select(isSingleCourseLoadingSelector));
  isSearchingState$: Observable<boolean> = this.store.pipe(select(isSearchingStateSelector));
  allCourses$: Observable<Course[]> = this.store.pipe(select(getAllCourses));
  course$: Observable<Course | null> = this.store.pipe(select(getCourse));
  errorMessage$: Observable<string | null> = this.store.pipe(select(getErrorMessage));


  constructor(private store: Store) {}

  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(title: string): void {
    this.store.dispatch(CoursesActions.requestFilteredCourses({ title }));
  }

  editCourse(course: Course, id: string): void {
    this.store.dispatch(CoursesActions.requestEditCourse({ id, course }));
  }

  createCourse(course: Course): void {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course }));
  }

  deleteCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
    
  }
}
