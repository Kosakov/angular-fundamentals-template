import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UrlTree } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { SessionStorageService } from '@app/auth/services/session-storage.service';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(private userStore: UserStoreService, private router: Router,private AuthService:AuthService,private SessionStorageService:SessionStorageService) {}
    isAdmin:boolean=false
    
 


    canActivate(): boolean | UrlTree {
        this.userStore.isAdmin$.subscribe((bool=>{
            this.isAdmin=bool
        }))       // Check if the user is an admin
        if (this.isAdmin) {
            console.log("true AdminGuard")
            return true; // Allow access if admin
        } else {
            // Redirect to /courses if not admin
            console.log("false AdminGuard")
            return this.router.createUrlTree(['']);
        }
    }
}
