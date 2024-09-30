import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionStorageService } from '../services/session-storage.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, 
    private router: Router, 
    private sessionStorageServ:SessionStorageService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token=this.sessionStorageServ.getToken();

        let modifiedReq=req;
        if(token){
            modifiedReq = req.clone({
                setHeaders:{
                    Authorization:`${token}`
                }
            });
        }

        return next.handle(modifiedReq).pipe(
            catchError((error:HttpErrorResponse)=>{
                if (error.status===401){
                    this.authService.logout();
                    this.router.navigate(['/login'])
                }
                return throwError(() => error);
            })
        )
    }
}


