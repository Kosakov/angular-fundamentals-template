import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './user.interface';
import { SessionStorageService } from '@app/auth/services/session-storage.service';
import { AuthService } from '@app/auth/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = 'http://localhost:4000/users';
    public isAuthorized:boolean=false

    constructor(private http: HttpClient,private SessionStorageService:SessionStorageService,private AuthService:AuthService) {}

    getUser(): Observable<User> {
        const token = this.SessionStorageService.getToken(); // Retrieve the token from session storage
        const headers = new HttpHeaders({
          'Authorization': `${token}` // Add the token to the Authorization header
        });
    
        return this.http.get<User>(`${this.apiUrl}/me`, { headers }).pipe(
            catchError(error => {
                // Handle the error here
                console.error('Error occurred:', error);
                return throwError(() => new Error('Failed to fetch data. Please try again.'));
              }) // Error handling function
        );
    }




      
    // Error handling method
    private handleError(error: HttpErrorResponse) {
        // Check if the error is client-side or server-side
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            console.error('Client-side error:', error.error.message);
        } else {
            // Server-side error
            console.error(`Server-side error: ${error.status}, ` + `Body: ${error.error}`);
        }
        // Return an observable with a user-facing error message
        return throwError('Something went wrong; please try again later.');
    }
}
