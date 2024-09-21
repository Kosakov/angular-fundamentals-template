import { Pipe } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe {
    transform(value:any){
    let tempDate= new Date(value)
    let year=tempDate.getFullYear()
    let day=tempDate.getDate()<10?"0"+tempDate.getDate():tempDate.getDate()
    let month=tempDate.getMonth()+1<10?"0"+(tempDate.getMonth()+1):tempDate.getMonth()+1
    return `${day}.${month}.${year}` 
    }
}
