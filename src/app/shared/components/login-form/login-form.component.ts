import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent{
  @ViewChild("loginForm") public loginForm!: NgForm;
  showEmailErrorText=false
  showPassErrorText=false

 

  onSubmit(){
    console.log(this.loginForm.controls)
    console.log(this.loginForm.controls['email']?.touched)
    if (this.loginForm.controls['email']?.touched || this.loginForm.controls['email']?.errors?.['invalidEmail'] || !this.loginForm.controls['email']?.["value"] ){
      this.showEmailErrorText=true
    }
    else{
      this.showEmailErrorText=false
    }


    if(!this.loginForm.controls['password'].valid){
      this.showPassErrorText=true
    }



  }
}

