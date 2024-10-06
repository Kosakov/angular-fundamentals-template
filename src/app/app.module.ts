import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from '@app/app.component';
import { CourseInfoComponent } from '@app/features/course-info/course-info.component';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { CoursesComponent } from './features/courses/courses.component';
import { CoursesListComponent } from './features/courses/courses-list/courses-list.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SessionStorageService } from './auth/services/session-storage.service';
import { StoreModule } from '@ngrx/store';
import { effects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';


@NgModule({
  declarations: [AppComponent, CourseInfoComponent, CoursesComponent, CoursesListComponent],
  imports: [
    BrowserModule,
    SharedModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects)],
  providers: [AuthorizedGuard, NotAuthorizedGuard, CoursesService, CoursesStoreService,SessionStorageService,Window,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor, 
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
