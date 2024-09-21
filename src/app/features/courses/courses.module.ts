import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import {CustomDatePipe} from '@shared/pipes/custom-date.pipe'
import {AuthorPipe} from '@shared/pipes/authorNames.pipe'
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    CustomDatePipe,
    AuthorPipe,
    FormsModule
  ]
})
export class CoursesModule { }
