import { Pipe } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe {
    transform(value:any){
    //let tempDate= new Date(value)
    //let year=tempDate.getFullYear()
    //let day=tempDate.getDate()<10?"0"+tempDate.getDate():tempDate.getDate()
    //let month=tempDate.getMonth()+1<10?"0"+(tempDate.getMonth()+1):tempDate.getMonth()+1
    let [ day,month,year]=value.split("/")
    day = day.padStart(2, '0');
    month = month.padStart(2, '0');
    return `${day}.${month}.${year}` 
    }
}
