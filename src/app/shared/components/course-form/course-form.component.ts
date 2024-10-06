import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  courseForm!: FormGroup;
  authorRegex: string = '^(?=.*[a-zA-Z])[a-zA-Z0-9]+$';
  invalidTitle: boolean = false;
  invalidDescription: boolean = false;
  invalidDuration: boolean = false;
  invalidAuthorName: boolean = false;
  authorIdsArr: string[] = []; 
  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private CoursesStoreService: CoursesStoreService,
    private coursesFacade: CoursesStateFacade
  ) {
    library.addIconPacks(fas);
    this.buildForm();
  }

  buildForm() {
    this.courseForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      author: this.fb.group({
        author: new FormControl('', [Validators.minLength(2), Validators.pattern(this.authorRegex)]),
      }),
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
      duration: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  onSubmit(): void {
    const title = this.courseForm.controls['title'];
    const description = this.courseForm.controls['description'];
    const duration = this.courseForm.controls['duration'];
    const author = this.courseForm.controls['author'];

    this.invalidTitle = title.errors?.['required'] || title.errors?.['minlength'] ? true : false;
    this.invalidDescription = description.errors?.['required'] || description.errors?.['minlength'] ? true : false;
    this.invalidDuration = duration.errors?.['required'] || duration.errors?.['min'] ? true : false;
    this.invalidAuthorName = author.invalid ? true : false;

    if (this.courseForm.valid) {
      const course = {
        title: title.value,
        description: description.value,
        duration: +duration.value,
        authors: this.authorIdsArr, // Use the array of author IDs
      };

      this.coursesFacade.createCourse(course)

    }
  }

  getAuthors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  getCourseAuthors(): FormArray {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  createAuthor(): void {
    const authorGroup = this.courseForm.get('author') as FormGroup;
    const newAuthorControl = authorGroup.get('author');
    const authorValue = newAuthorControl?.value;

    if (newAuthorControl?.valid) {
        // Create the author using the service
        this.CoursesStoreService.createAuthor(authorValue).subscribe({
            next: (response: any) => {
                if (response.successful) {
                    const authorId = response.result.id; // Get the created author's ID

                    // Add author to the authors FormArray
                    this.getAuthors().push(this.fb.group({
                        id: authorId, // Use the actual ID
                        author: authorValue,
                    }));

                    newAuthorControl.setValue('');
                    this.invalidAuthorName = false;
                }
            },
            error: (err: any) => {
                console.error('Error creating author:', err);
            },
        });
    } else {
        this.invalidAuthorName = true;
    }
}

createCourseAuthor(index: number): void {
  let tempAuthor = this.getAuthors().at(index);
  const authorId = tempAuthor.get('id')?.value; // Get the ID from the temporary author
  if (authorId) {
      this.authorIdsArr.push(authorId); // Add the author ID to the array
  }

  this.getCourseAuthors().push(tempAuthor);
  this.getAuthors().removeAt(index);
}

  moveCourseAuthor(index: number): void {
    let tempAuthor = this.getCourseAuthors().at(index);
    const authorId = tempAuthor.get('id')?.value; // Get the ID from the temporary author
  if (authorId) {
    const tempIDIndex=this.authorIdsArr.indexOf(authorId);
      this.authorIdsArr.splice(tempIDIndex, 1)
  }
    this.getAuthors().push(tempAuthor);
    this.getCourseAuthors().removeAt(index);
  }
}
