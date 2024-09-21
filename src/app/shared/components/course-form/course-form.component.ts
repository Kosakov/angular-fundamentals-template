import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent  implements OnInit{
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;
  authorRegex:string='^(?=.*[a-zA-Z])[a-zA-Z0-9]+$'
  
  ngOnInit(){
    this.courseForm = this.fb.group(
      {
        'title': new FormControl(null,[Validators.required,Validators.minLength(2)]),
        'description': new FormControl(null,[Validators.required,Validators.minLength(2)]),
        'author': new FormControl(null,[Validators.required,Validators.minLength(2),Validators.pattern(this.authorRegex)]),
        'authors':this.fb.array([]),
        'duration':new FormControl(0,[Validators.required,Validators.min(0)]),
      }

    )

  }

  onSubmit(){
    console.log(this.courseForm)
  }

  get authors() {
    return this.courseForm.get('authors') as FormArray;
  }

  addAuthor() {
    if (!this.courseForm.controls['author'].errors?.['required'] && !this.courseForm.controls['author'].errors?.['pattern']){
    this.authors.push(new FormControl(this.courseForm.controls['author'].value, [Validators.required, Validators.minLength(2)]));
    }
    return
  }
  
  removeAuthor(index: number) {
    this.authors.removeAt(index);
  }

}
