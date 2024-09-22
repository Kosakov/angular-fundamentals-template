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
  
  ngOnInit() {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      author: this.fb.group({
        name: ['', [Validators.minLength(2), Validators.pattern(this.authorRegex)]]
      }),
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
      duration: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    console.log(this.courseForm.value);
    
    this.invalidTitle = this.courseForm.get('title')?.errors?.['required'] || this.courseForm.get('title')?.errors?.['minlength'];
    this.invalidDescription = this.courseForm.get('description')?.errors?.['required'] || this.courseForm.get('description')?.errors?.['minlength'];
    this.invalidDuration = this.courseForm.get('duration')?.errors?.['required'] || this.courseForm.get('duration')?.errors?.['min'];
    this.invalidAuthorName = this.courseForm.get('author')?.get('name')?.errors?.['pattern'] ? true : false;
  }

  getAuthors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  getCourseAuthors(): FormArray {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  createAuthor() {
    const authorGroup = this.courseForm.get('author') as FormGroup;
  
    if (authorGroup.get('name')?.valid) {
      this.getAuthors().push(authorGroup);
      this.courseForm.setControl('author', this.fb.group({
        name: ['', [Validators.minLength(2), Validators.pattern(this.authorRegex)]]
      }));
      this.invalidAuthorName = false;
    } else {
      this.invalidAuthorName = true;
    }
  }

  createCourseAuthor(index: number) {
    const tempAuthor = this.getAuthors().at(index).value;
    this.getCourseAuthors().push(this.fb.control(tempAuthor.name, [
      Validators.minLength(2),
      Validators.pattern(this.authorRegex)
    ]));
    this.getAuthors().removeAt(index);
  }

  removeAuthor(index: number) {
    this.getAuthors().removeAt(index);
  }

  moveCourseAuthor(index: number) {
    const tempAuthor = this.getCourseAuthors().at(index).value;
    this.getCourseAuthors().removeAt(index);
    this.getAuthors().push(this.fb.group({
      name: [tempAuthor, [Validators.minLength(2), Validators.pattern(this.authorRegex)]]
    }));
  }
}