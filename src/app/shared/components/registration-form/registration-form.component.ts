import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup; 
  // Use the names `name`, `email`, `password` for the form controls.

  invalidName:boolean=false
  invalidEmail:boolean=false
  invalidPass:boolean=false
  constructor(private router: Router,private AuthService:AuthService) { }
  navigateToLogin() {
    this.router.navigate(['/login']); 
  }

  ngOnInit(){
    this.registrationForm = new FormGroup(
      {
        'name': new FormControl(null,[Validators.required,Validators.minLength(6)]),
        'email': new FormControl(null,[Validators.required]),
        'password': new FormControl(null,[Validators.required])

      }

    )



  }

  onSubmit(){
    let name=this.registrationForm.controls['name']
    let email=this.registrationForm.controls['email']
    let password=this.registrationForm.controls['password']
    if (name?.errors?.['required'] || name?.errors?.['minlength'] ){
      this.invalidName=true
    }
    else{
      this.invalidName=false
    }
    if (email?.errors?.['required'] || email?.errors?.['invalidEmail']){
      this.invalidEmail=true
    }
    else{
      this.invalidEmail=false
    }
    if (password?.errors?.['required']){
      this.invalidPass=true
    }
    else{
      this.invalidPass=false
    }

    if (this.registrationForm.valid){
      const user={
        'name':`${name.value}`,
        'email':`${email.value}`,
        'password':`${password.value}`
      }
      this.AuthService.register(user).subscribe({
        next: (response) => {
            console.log(response)
            if (response.successful) {
                // Navigate to the courses page or another route
                this.router.navigate(['/login']);
                
            }
        },
        error: (error) => {
            // Handle login error
            console.log(error)
            //console.error('Login error:', error);
        }
    });
    }

  }





}
