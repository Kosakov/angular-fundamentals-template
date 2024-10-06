import { Pipe } from "@angular/core";
//import {mockedAuthorsList} from '@shared/mocks/mock'
import { CoursesStoreService } from '@app/services/courses-store.service';
import { map, Observable, of } from "rxjs";


@Pipe({
    name: 'author',
    pure: false
})
export class AuthorPipe {
  authors$: Observable<any[]>;

  constructor(private CoursesStoreService:CoursesStoreService){
    this.authors$ = this.CoursesStoreService.authors$;

  }

  transform(ids: string[] | null | undefined): Observable<string[]> {
    if (!ids || ids.length === 0) {
      return of(['Unknown']);  // If `ids` is null, undefined, or empty, return an observable with 'Unknown'
    }
  
    return this.authors$.pipe(
      map((authors) =>
        ids.map((id) => {
          const author = authors.find((a) => a.id === id);
          return author.name
        })
      )
    );
  }
}
