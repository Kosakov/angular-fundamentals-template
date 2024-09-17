import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent{

  @Input() title!:string
  @Input() description!:string
  @Input() authorsNames?:string[]
  @Input() durationFormated?:string
  @Input() creationDate?:string
  @Output() clickOnShow=new EventEmitter<MouseEvent>()
  buttonText="Show Course"
  @Input() editable!:boolean


  onShowMoreInfo(e:MouseEvent) {
    this.clickOnShow.emit(e); 
  }
}


