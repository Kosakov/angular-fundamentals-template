import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent{
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.buildForm();
  }
  courseForm!: FormGroup;
  authorRegex:string='^(?=.*[a-zA-Z])[a-zA-Z0-9]+$'
  invalidTitle:boolean=false
  invalidDescription:boolean=false
  invalidDuration:boolean=false
  invalidAuthorName:boolean=false
  
  buildForm() {
    this.courseForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      author: this.fb.group({
        author: new FormControl('', [Validators.minLength(2), Validators.pattern(this.authorRegex)]),
      }),
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
      duration: new FormControl("", [Validators.required, Validators.min(0)]),
    });
  }




  onSubmit():void{
    //console.log(this.courseForm)
    
    this.invalidTitle=this.courseForm.controls['title'].errors?.['required'] || this.courseForm.controls['title'].errors?.['minlength']?true:false
    this.invalidDescription=this.courseForm.controls['description'].errors?.['required'] || this.courseForm.controls['description'].errors?.['minlength']?true:false
    this.invalidDuration=this.courseForm.controls['duration'].errors?.['required'] || this.courseForm.controls['duration'].errors?.['min']?true:false
    this.invalidAuthorName=this.courseForm.controls['author'].invalid?true:false
    console.log(this.courseForm.get('author') as FormGroup)
  }

  getAuthors():FormArray {
    return this.courseForm.get("authors") as FormArray;
    }

  getCourseAuthors():FormArray {
      return this.courseForm.get("courseAuthors") as FormArray;
   }   

  createAuthor():void {
    const authorGroup=this.courseForm.get('author') as FormGroup
    const newAuthorControl = authorGroup.get('author');
    const AuthorValue = authorGroup.get('author')?.value;
    const authorId = uuidv4();


    if (newAuthorControl?.value && newAuthorControl.valid){
    //console.log(newAuthorControl)
    this.getAuthors().push(this.fb.group({
      id:{authorId},
      author: {AuthorValue}
    }));
    newAuthorControl?.setValue('');
    this.invalidAuthorName=false
  }
    this.invalidAuthorName=true
  }

  createCourseAuthor(index:number):void{
  let tempAuthor=this.getAuthors().at(index)
  this.getCourseAuthors().push(tempAuthor)
  this.getAuthors().removeAt(index)
  }
  
  //removeAuthor(index: number) {
  //  this.getAuthors().removeAt(index);
  //}

  moveCourseAuthor(index: number):void {
    let tempAuthor=this.getCourseAuthors().at(index)
    this.getAuthors().push(tempAuthor)
    this.getCourseAuthors().removeAt(index)
  }

}
