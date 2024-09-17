import { Component,OnInit} from '@angular/core';
import {mockedCoursesList,mockedAuthorsList} from '@shared/mocks/mock'
import { Course } from '@shared/components/course-card/interfaces';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})


export class CoursesComponent implements OnInit{
  courses:Course[]=[...mockedCoursesList]
  authorsList=mockedAuthorsList
  selectedCourse: any;
  clickedBack:boolean=true;
  
  ngOnInit():void{
    this.courses.forEach(course=>{
      course.authorsNames=this.getNamesByIds(course.authors);
      course.durationFormated=this.formatDuration(course.duration);
      course.formatedDate=this.formatDate(course.creationDate)
    })
    
  }

  editable = true; 

  handleShowCourse(course: Course) {
    this.selectedCourse = course;
    this.clickedBack=false
    //console.log('Show course:', course);
    
  }

  handleEditCourse(course: Course) {
    //console.log('Edit course:', course);
    
  }

  handleDeleteCourse(course: Course) {
    //console.log('Delete course:', course);
    
  }

  handleBack(isclicked:any):void {
    this.clickedBack=isclicked
    //console.log(isclicked)
    
  }

   getNamesByIds(ids: string[]): string[] {
    return ids.map(id => {
      const author = this.authorsList.find(author => author.id === id);
      return author ? author.name : 'No Author'; 
    });
  }
  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins} hours`;
  }

  formatDate(date:string):string{
    let tempDate= new Date(date)
    let year=tempDate.getFullYear()
    let day=tempDate.getDate()<10?"0"+tempDate.getDate():tempDate.getDate()
    let month=tempDate.getMonth()+1<10?"0"+(tempDate.getMonth()+1):tempDate.getMonth()+1
    return `${month}.${day}.${year}`
  }
}


