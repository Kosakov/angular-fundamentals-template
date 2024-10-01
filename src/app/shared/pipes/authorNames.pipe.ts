import { Pipe } from "@angular/core";
//import {mockedAuthorsList} from '@shared/mocks/mock'
import { CoursesStoreService } from '@app/services/courses-store.service';
import { map, Observable } from "rxjs";


@Pipe({
    name: 'author',
    pure: false
})
export class AuthorPipe {
  authors$: Observable<any[]>;

  constructor(private CoursesStoreService:CoursesStoreService){
    this.authors$ = this.CoursesStoreService.authors$;

  }

  transform(ids: string[]): Observable<string[]> {
  // Transform the IDs into the corresponding names
    return this.authors$.pipe(
      map((authors) =>
        ids.map((id) => {

          const author = authors.find((a) => a.id === id);
          return author ? author.name : 'Unknown';
        })
      )
    );
}
}
