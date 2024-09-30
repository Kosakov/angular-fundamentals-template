import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { CoursesComponent } from './features/courses/courses.component';
import { CourseCardComponent, CourseFormComponent, LoginFormComponent, RegistrationFormComponent } from './shared/components';
import { AdminGuard } from './user/guards/admin.guard';

export const routes: Routes = [
    {path:"login",component:LoginFormComponent,canActivate:[NotAuthorizedGuard]},
    {path:"registration",component:RegistrationFormComponent,canActivate:[NotAuthorizedGuard]},
    {path:"",redirectTo: '/courses', pathMatch: 'full',canLoad:[AuthorizedGuard]},
    {path:"courses",component:CoursesComponent,canLoad:[AuthorizedGuard]},
    {path:"courses/add",component:CourseFormComponent,canLoad:[AuthorizedGuard],canActivate:[AdminGuard]},
    {path:"courses/:id",component:CourseCardComponent,canLoad:[AuthorizedGuard]},
    {path:"courses/edit:id",component:CourseFormComponent,canLoad:[AuthorizedGuard],canActivate:[AdminGuard]}
];

