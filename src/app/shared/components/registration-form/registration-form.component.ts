import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }
 
  navigateToLogin(){
    this.router.navigate(["login"])
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
    if (this.registrationForm.controls['name']?.errors?.['required'] || this.registrationForm.controls['name']?.errors?.['minlength'] ){
      this.invalidName=true
    }
    else{
      this.invalidName=false
    }
    if (this.registrationForm.controls['email']?.errors?.['required'] || this.registrationForm.controls['email']?.errors?.['invalidEmail']){
      this.invalidEmail=true
    }
    else{
      this.invalidEmail=false
    }
    if (this.registrationForm.controls['password']?.errors?.['required']){
      this.invalidPass=true
    }
    else{
      this.invalidPass=false
    }

  }


}
