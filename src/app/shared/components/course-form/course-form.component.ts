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
  invalidTitle:boolean=false
  invalidDescription:boolean=false
  invalidDuration:boolean=false
  invalidAuthorName:boolean=false
  
  ngOnInit(){
    this.courseForm = this.fb.group(
      {
        'title': new FormControl("",[Validators.required,Validators.minLength(2)]),
        'description': new FormControl("",[Validators.required,Validators.minLength(2)]),
        'author': new FormControl("",[Validators.minLength(2),Validators.pattern(this.authorRegex)]),
        'authors':this.fb.array([]),
        'duration':new FormControl(0,[Validators.required,Validators.min(0)]),
      }

    )

  }
  

  onSubmit(){
    //console.log(this.courseForm)
    
    this.invalidTitle=this.courseForm.controls['title'].errors?.['required'] || this.courseForm.controls['title'].errors?.['minlength']?true:false
    this.invalidDescription=this.courseForm.controls['description'].errors?.['required'] || this.courseForm.controls['description'].errors?.['minlength']?true:false
    this.invalidDuration=this.courseForm.controls['duration'].errors?.['required'] || this.courseForm.controls['duration'].errors?.['min']?true:false
    this.invalidAuthorName=this.courseForm.controls['author'].errors?.['pattern']?true:false
    //console.log(this.invalidAuthorName)
  }

  getAuthors() {
    return this.courseForm.get("authors") as FormArray;
    }

  addAuthor() {
    if (!this.courseForm.controls['author'].errors?.['pattern']){
    this.getAuthors().push(new FormControl(this.courseForm.controls['author'].value, [Validators.minLength(2)]));
    this.courseForm.controls['author'].reset();
    this.invalidAuthorName=false
    }
    this.invalidAuthorName=true
    return
  }
  
  removeAuthor(index: number) {
    this.getAuthors().removeAt(index);
  }

}
