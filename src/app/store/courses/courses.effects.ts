import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import { CoursesService } from '@app/services/courses.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Course } from '@app/features/courses/interfaces';
import { CourseResponse } from '@app/services/author.interface';
import {Router} from '@angular/router'
import { CoursesStateFacade } from "@app/store/courses/courses.facade";


@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private router:Router,
    private coursesFacade: CoursesStateFacade
  ) {}

  // Get all courses
  getAll$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      mergeMap(() =>
        this.coursesService.getAll().pipe(
          map((courses: Course[]) => CoursesActions.requestAllCoursesSuccess({ courses })),
          catchError((error) => of(CoursesActions.requestAllCoursesFail({ error })))
        )
      )
    )
  );

  // Get a single course
  getSpecificCourse$ = createEffect((): Observable<Action> =>
  this.actions$.pipe(
    ofType(CoursesActions.requestSingleCourse),
    mergeMap(({ id }) =>
      this.coursesService.getCourse(id).pipe(
        map((course: Course) => CoursesActions.requestSingleCourseSuccess({ course })),
        catchError((error) => of(CoursesActions.requestSingleCourseFail({ error })))
      )
    )
  )
);

  // Create a new course
  createCourse$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap(({ course }) =>
        this.coursesService.createCourse(course).pipe(
          map((newCourse: Course) =>
            CoursesActions.requestCreateCourseSuccess({ course: newCourse })
          ),
          catchError((error) => of(CoursesActions.requestCreateCourseFail({ error })))
        )
      )
    )
  );

  // Edit a course
  editCourse$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap(({ id, course }) =>
        this.coursesService.editCourse(id, course).pipe(
          map((updatedCourse: Course) =>
            CoursesActions.requestEditCourseSuccess({ course: updatedCourse })
          ),
          catchError((error) => of(CoursesActions.requestEditCourseFail({ error })))
        )
      )
    )
  );

  // Delete a course
  deleteCourse$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      mergeMap(({ id }) =>
        this.coursesService.deleteCourse(id).pipe(
          map(() => CoursesActions.requestDeleteCourseSuccess({id})),
          catchError((error) => of(CoursesActions.requestDeleteCourseFail({ error })))
        )
      )
    )
  );

  filteredCourses$ = createEffect((): Observable<Action> =>
  this.actions$.pipe(
    ofType(CoursesActions.requestFilteredCourses),
    mergeMap(({ title }) =>
      this.coursesService.filterCourses(title).pipe(
        map((response: Course[]) => {
          // Extract 'courses' from the CourseResponse object
          console.log(response)
          return CoursesActions.requestFilteredCoursesSuccess({ courses: response });
        }),
        catchError((error) => of(CoursesActions.requestFilteredCoursesFail({ error: error.message })))
      )
    )
  )

);
redirectToTheCoursesPage$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CoursesActions.requestCreateCourseSuccess, CoursesActions.requestEditCourseSuccess),
    map(() => this.router.navigate(['/courses']))
  ),
  { dispatch: false }
);

}
