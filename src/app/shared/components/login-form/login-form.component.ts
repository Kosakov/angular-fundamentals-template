import { Component, ViewChild } from '@angular/core';
import { NgForm,FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { User } from '@app/auth/services/user.interface';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent{
  @ViewChild("loginForm") public loginForm!: NgForm;
  showEmailErrorText=false
  showPassErrorText=false
  errorMessage: string="";
  

  constructor(private router: Router, private authService:AuthService, private userStore:UserStoreService) { }

  onSubmit(): void {
    
    if (this.loginForm.valid) {
     
        const user: User = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        };

        this.authService.login(user).subscribe({
            next: (response) => {
                // Handle successful login
                if (response.successful) {
                     this.userStore.getUser()
                    // Navigate to the courses page or another route
                    this.router.navigate(['/courses']);
                    
                }
            },
            error: (error) => {
                // Handle login error
                this.errorMessage = 'Login failed. Please check your credentials.';
                //console.error('Login error:', error);
            }
        });
    }


    if(!this.loginForm.controls['password'].valid){
      this.showPassErrorText=true
    }

  }
  navigateToRegistration() {
    this.router.navigate(['/registration']); 
  }
}

