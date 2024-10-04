import { Injectable } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { SessionStorageService } from '@app/auth/services/session-storage.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.interface';
import { UserService } from './user.service'; 
SessionStorageService

@Injectable({
    providedIn: 'root',
})
export class UserStoreService {

    private name$$ = new BehaviorSubject<string | null>(null); 
    private isAdmin$$ = new BehaviorSubject<boolean>(false); 
    public name$ = this.name$$.asObservable();
    public isAdmin$ = this.isAdmin$$.asObservable();
    public  isAdminValue:boolean=false
    constructor(private userService: UserService, private AuthService:AuthService,private SessionStorageService:SessionStorageService) {}

    getUser() {
            if (this.SessionStorageService.getToken()){
                this.userService.getUser().subscribe({
                    next: (info: any) => { 
                        let name=info.result.name
                        if (info.result) {
                            
                            //console.log('Kotkaaaa')
                            this.name$$.next(name); 
                            if (info.result.role === 'admin')
                            {
                                this.isAdmin$$.next(true); 
                                
                            }
                        }
                        else{
                            this.isAdmin$$.next(false)
                        }
                    },
                    error: (err) => {
                        console.error('Error fetching user:', err);

                        this.isAdmin$$.next(false); 
                    }
                });
            }
            this.isAdmin$$.next(false);

    }




    // Getter for isAdmin
    get isAdmin(): boolean {
        //console.log(this.isAdmin$$.getValue())
        //return this.isAdminValue;
        return this.isAdmin$$.getValue(); // Return the current value of isAdmin$$
        
        
    }

    // Setter for isAdmin
    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value); // Update the value of isAdmin$$
        //this.isAdminValue=value
    }
}


