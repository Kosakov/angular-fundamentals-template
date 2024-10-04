import { Course } from '@app/features/courses/interfaces';
import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';

export interface CoursesState {
  allCourses: Course[] | null;
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string | null;
}

export const initialState: CoursesState = {
  allCourses: null,
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: null,
};

export const coursesFeatureKey = 'courses';


export const coursesReducer = createReducer(
  initialState,

  // Handling requestAllCourses action
  on(CoursesActions.requestAllCourses, (state): CoursesState => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: null,
  })),

  // Handling requestAllCoursesSuccess action
  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }): CoursesState => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: null,
  })),

  // Handling requestAllCoursesFail action
  on(CoursesActions.requestAllCoursesFail, (state, { error }): CoursesState => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  // Handling requestSingleCourse action
  on(CoursesActions.requestSingleCourse, (state): CoursesState => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
    course: null,
  })),

  // Handling requestSingleCourseSuccess action
  on(CoursesActions.requestSingleCourseSuccess, (state, { course }): CoursesState => ({
    ...state,
    isSingleCourseLoading: false,
    course,
    errorMessage: null,
  })),

  // Handling requestSingleCourseFail action
  on(CoursesActions.requestSingleCourseFail, (state, { error }): CoursesState => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  // Handling requestCreateCourse action
  on(CoursesActions.requestCreateCourse, (state): CoursesState => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),

  // Handling requestCreateCourseSuccess action
  on(CoursesActions.requestCreateCourseSuccess, (state, { course }): CoursesState => ({
    ...state,
    isSingleCourseLoading: false,
    allCourses: state.allCourses ? [...state.allCourses, course] : [course],
    errorMessage: null,
  })),

  // Handling requestCreateCourseFail action
  on(CoursesActions.requestCreateCourseFail, (state, { error }): CoursesState => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  // Handling requestEditCourse action
  on(CoursesActions.requestEditCourse, (state): CoursesState => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),

  // Handling requestEditCourseSuccess action
  on(CoursesActions.requestEditCourseSuccess, (state, { course }): CoursesState => ({
    ...state,
    isSingleCourseLoading: false,
    allCourses: state.allCourses
      ? state.allCourses.map(c => (c.id === course.id ? course : c))
      : [course],
    errorMessage: null,
  })),

  // Handling requestEditCourseFail action
  on(CoursesActions.requestEditCourseFail, (state, { error }): CoursesState => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  // Handling requestDeleteCourse action
  on(CoursesActions.requestDeleteCourse, (state): CoursesState => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),

  // Handling requestDeleteCourseSuccess action
  on(CoursesActions.requestDeleteCourseSuccess, (state): CoursesState => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: null,
    allCourses: state.allCourses ? state.allCourses.filter(course => course.id !== state.course?.id) : null,
  })),

  // Handling requestDeleteCourseFail action
  on(CoursesActions.requestDeleteCourseFail, (state, { error }): CoursesState => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  // Handling requestFilteredCourses action
  on(CoursesActions.requestFilteredCourses, (state): CoursesState => ({
    ...state,
    isAllCoursesLoading: true,
    isSearchState: true,
    errorMessage: null,
  })),

  // Handling requestFilteredCoursesSuccess action
  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }): CoursesState => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    isSearchState: false,
    errorMessage: null,
  })),

  // Handling requestFilteredCoursesFail action
  on(CoursesActions.requestFilteredCoursesFail, (state, { error }): CoursesState => ({
    ...state,
    isAllCoursesLoading: false,
    isSearchState: false,
    errorMessage: error,
  }))
);

export const reducer = (state: CoursesState | undefined, action: Action): CoursesState => {
  return coursesReducer(state, action);
};
