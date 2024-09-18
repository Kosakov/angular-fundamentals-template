import { Pipe } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe {
    transform(minutes: number | undefined): string {
        if (minutes){
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return `${hours}:${mins} hours`;
        }
        return "No duration added"
      }
    
}
