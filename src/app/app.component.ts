import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'courses-app';
  buttonLogin:string="Login"
  buttonLogout:string="Logout"
  isLoggedIn: boolean = true;
  userName:string="Harry Potter"
  infoTitle:string="Your List is empty "
  infoCurrentText:string=`Please use 'Add New Course' button to add your first course`
  buttonInfo:string="Add New Course"
   toggleLogin() {
        this.isLoggedIn = !this.isLoggedIn;
        
    }

    
}
