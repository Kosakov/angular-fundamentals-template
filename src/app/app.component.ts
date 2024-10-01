import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { SessionStorageService } from './auth/services/session-storage.service';
import { UserStoreService } from './user/services/user-store.service';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { UserService } from './user/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'courses-app';
  buttonLogin:string="Login"
  buttonLogout:string="Logout"
  isLoggedIn: boolean=false
  userName:string|null=""
  infoTitle:string="Your List is empty "
  infoCurrentText:string=`Please use 'Add New Course' button to add your first course`
  buttonInfo:string="Add New Course"
  hasCourses:boolean=false
  authors$:any=[]

  constructor(private AuthServ:AuthService,
    private UserStore:UserStoreService,
    private sessionStorage:SessionStorageService,
    private coursesStoreService:CoursesStoreService,
    private UserService:UserService){
  }
  ngOnInit(): void {
    this.UserStore.getUser()
    this.AuthServ.isAuthorized$.subscribe((isAuthorized) => {
      this.isLoggedIn=isAuthorized
    })    
    if (this.sessionStorage.getToken()){
      //
      this.isLoggedIn=true
      this.UserStore.name$.subscribe((name)=>{
        this.userName=name
      })
    }
    this.coursesStoreService.courses$.subscribe(courses => {
      if (courses && courses.length > 0) {
        this.infoTitle = "" // If there are courses, set flag to true
      } 
    });

  }

  

  logout(){
    this.AuthServ.logout()
    this.AuthServ.isAuthorised=false
  }

    
}
