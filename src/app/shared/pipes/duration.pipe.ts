import { Pipe } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe {
    transform(minutes: number | undefined): string {
        
        if (minutes){
            
            let hours:string|number = Math.floor(minutes / 60);
            let mins:string|number = minutes % 60;
            let text = hours < 2 ? "hour" : "hours";
            if(hours<10){
                hours="0"+hours.toString()
                
            }
            if(mins<10){
                mins="0"+mins.toString()
            }
            return `${hours}:${mins} ${text}`;
        }
        return `No duration added`
      }
    
}
