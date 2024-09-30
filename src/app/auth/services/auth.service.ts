import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';
import { User } from './user.interface';



@Injectable({
    providedIn: 'root'
})
export class AuthService {
private isAuthorized$$ =  new BehaviorSubject<boolean>(false)
public isAuthorized$:Observable<boolean>=this.isAuthorized$$.asObservable()

private apiUrl='http://localhost:4000'
constructor(
    private http:HttpClient,
    private sessionStorage:SessionStorageService
){}




    login(user: User): Observable<any> { // replace 'any' with the required interface
        return this.http.post<any>(`${this.apiUrl}/login`,user)
          .pipe(
            map((response)=>{
                if (response?.successful && response.result){
                    let token=response.result
                    this.sessionStorage.setToken(token)
                    this.isAuthorised=true
                }
                return response
            })
          );
    }

    logout():void {
        this.sessionStorage.deleteToken()
        this.isAuthorized$$.next(false);
    }


    register(user: User): Observable<any> { // replace 'any' with the required interface
        return this.http.post<any>(`${this.apiUrl}/register`,user)
          .pipe(
            map((response)=>{
                if (response.successful) {
                    console.log(response.result);
                  }
                return response
            })
          );
    }

    get isAuthorised():boolean {
        //console.log(`HERE--->${this.isAuthorized$$.value}`)
        return this.isAuthorized$$.value
       
    }

    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value)
    }

    getLoginUrl(): string {
        return `${this.apiUrl}/login`;
      }
}
