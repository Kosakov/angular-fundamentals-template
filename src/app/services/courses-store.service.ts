import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { CoursesService } from './courses.service';
import { Course } from '../features/courses/interfaces';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { Author, AuthorResponse,CourseResponse } from './author.interface';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private courses$$ = new BehaviorSubject<any>(null);
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    private courseSubject = new BehaviorSubject<any>(null);
    private authorsSubject = new BehaviorSubject<any>([]);
    private authorSubject = new BehaviorSubject<any>(null);
    private filteredCourses$$ = new BehaviorSubject<any>(null);

    courses$: Observable<Course[]> = this.courses$$.asObservable();
    isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
    authors$:Observable<any> = this.authorsSubject.asObservable();
    author$:Observable<Author[]> = this.authorSubject.asObservable();
    course$: Observable<any> = this.courseSubject.asObservable();


    constructor(private coursesService: CoursesService) {}


    getAll():void{
        this.isLoading$$.next(true)
        this.coursesService.getAll()
        .pipe(
            finalize(()=>this.isLoading$$.next(false)))
        .subscribe(
            {
                next:(courses)=>{
                    console.log(courses.result)
                    this.courses$$.next(courses.result);
                },
                error: (err) => {
                    this.coursesService.handleError(err);
                    console.log("Probleem")
                    console.error('Error from getAll', err);
                }
            }
        )
        
    }

    createCourse(course: Course): Observable<Course> {
        this.isLoading$$.next(true); // Start loading
        return this.coursesService.createCourse(course).pipe(
            tap((newCourse) => {
                // Optionally handle any state updates or side effects here
            }),
            finalize(() => this.isLoading$$.next(false)) // Stop loading
        );
    }

    getCourse(id: string) {
        this.isLoading$$.next(true)

        this.coursesService.getCourse(id)
        .pipe(
            finalize(()=>this.isLoading$$.next(false)))
        .subscribe(
            {
                next:(course)=>{
                    //console.log(course)
                    this.courseSubject.next(course);
                },
                error: (err) => {
                    this.coursesService.handleError(err);
                    console.error('Error from getCourse', err);
                }
            }
        )
    }

    editCourse(id: string, course: Course) { // replace 'any' with the required interface
        this.isLoading$$.next(true)

        this.coursesService.editCourse(id,course)
        .pipe(
            finalize(()=>this.isLoading$$.next(false))
        )
        .subscribe(
            {
            next:(course)=>{
            const currentCourses = this.courses$$.getValue(); // Get the current list of courses
            const index=currentCourses.findIndex((course:Course)=>course.id===id)
            if (index!==-1){
                currentCourses[index]=course
                this.courses$$.next([...currentCourses])
            }
            
            },
            error: (err) => {
                this.coursesService.handleError(err);
                console.error('Error from editCourse', err);
            }
            
        }

        )
    }

    deleteCourse(id: string) {
        this.isLoading$$.next(true)

        this.coursesService.deleteCourse(id)
        .pipe(
            finalize(()=>this.isLoading$$.next(false))
        )
        .subscribe(
            {
            next:(course)=>{
            const currentCourses = this.courses$$.getValue(); // Get the current list of courses
            const index=currentCourses.findIndex((course:Course)=>course.id===id)
            if (index!==-1){
                currentCourses.splice(index,1)
                this.courses$$.next([...currentCourses])
            }
            
            },
            error: (err) => {
                this.coursesService.handleError(err);
                console.error('Error from deleteCourse', err);
            }
            
        }

        )
    }

    filterCourses(values: string) {
            this.isLoading$$.next(true); // Start loading
            //console.log(values)
            this.coursesService.filterCourses(values) // Call the service method with the filter value
            .pipe(
                finalize(() => this.isLoading$$.next(false)) // Stop loading
            )
            .subscribe({
                next: (filteredCourses) => {
                    //console.log(filteredCourses)
                    this.courses$$.next(filteredCourses.result); // Update the subject with filtered courses
                },
                error: (err) => {
                     // Handle error consistently
                    console.error('Error from filterCourses', err); // Log error
                }
            });
        }
    

    getAllAuthors() {
        this.isLoading$$.next(true)

        this.coursesService.getAllAuthors()
        .pipe(
            finalize(()=>this.isLoading$$.next(false)))
        .subscribe(
            {
                next:(author)=>{
                    this.authorsSubject.next(author.result);
                },
                error: (err) => {
                    this.coursesService.handleError(err);
                    console.error('Error from getAllAuthors', err);
                }
            }
        )
    }

    createAuthor(name: string): Observable<AuthorResponse> {
        this.isLoading$$.next(true);
        return this.coursesService.createAuthor(name).pipe(
            tap(newAuthor => {
                const currentAuthors = this.authorsSubject.getValue();
                // Update authorsSubject with new author
                this.authorsSubject.next([...currentAuthors, newAuthor.result]);
            }),
            finalize(() => this.isLoading$$.next(false)) // Stop loading
        );
    }

    getAuthorById(id: string): Observable<any> {
        this.isLoading$$.next(true);
    
        return this.coursesService.getAuthorById(id).pipe(
            map((response:Author) => {
                // Check if the response is successful
                if (response.successful && response.result) {
                    return response.result; // Return the result if successful
                } else {
                    throw new Error('Unsuccessful response');
                }
            }),
            finalize(() => this.isLoading$$.next(false)), // Stop loading after request finishes
            catchError((err) => {
                this.coursesService.handleError(err); // Handle error
                console.error('Error from getAuthorById', err);
                return throwError(() => new Error('Failed to fetch author')); // Return an observable error
            })
        );
    }

    
}
