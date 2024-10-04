import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.reducer';

// Feature selector
export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

// Selectors
export const isAllCoursesLoadingSelector = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.isAllCoursesLoading
);

export const isSingleCourseLoadingSelector = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.isSingleCourseLoading
);

export const isSearchingStateSelector = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.isSearchState
);

export const getAllCourses = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.allCourses
);

export const getCourse = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.course
);

export const getErrorMessage = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.errorMessage
);
