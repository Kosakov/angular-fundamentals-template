import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '@app/features/courses/interfaces';
import * as CoursesActions from './courses.actions';
import {
  isAllCoursesLoadingSelector,
  isSingleCourseLoadingSelector,
  isSearchingStateSelector,
  getAllCourses,
  getCourse,
  getErrorMessage
} from './courses.selectors';
import { CoursesState } from './courses.reducer';

@Injectable({
  providedIn: 'root',
})
export class CoursesFacade {
  // Observable properties
  isAllCoursesLoading$: Observable<boolean> = this.store.pipe(
    select(isAllCoursesLoadingSelector)
  );
  
  isSingleCourseLoading$: Observable<boolean> = this.store.pipe(
    select(isSingleCourseLoadingSelector)
  );
  
  isSearchingState$: Observable<boolean> = this.store.pipe(
    select(isSearchingStateSelector)
  );
  
  allCourses$: Observable<Course[] | null> = this.store.pipe(
    select(getAllCourses)
  );
  
  course$: Observable<Course | null> = this.store.pipe(
    select(getCourse)
  );
  
  errorMessage$: Observable<string | null> = this.store.pipe(
    select(getErrorMessage)
  );

  constructor(private store: Store<CoursesState>) {}

  // Methods to dispatch actions
  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(CoursesActions.request
