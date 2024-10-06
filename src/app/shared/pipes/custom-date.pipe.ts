import { Pipe } from "@angular/core";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe {
  transform(value: string | undefined): string {
    if (value){
    let [day, month, year] = value!.split("/");
    day = day.padStart(2, "0");
    month = month.padStart(2, "0");
    return `${day}.${month}.${year}`;}
    return "None"
  }
}
