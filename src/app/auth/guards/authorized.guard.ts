import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route): boolean | UrlTree {
    if (this.authService.isAuthorised) {
      console.log("True AuthGurad")
      return true;
    }
    console.log("False AuthGurad")
    return this.router.createUrlTree(['/login']);
    
  }
}
