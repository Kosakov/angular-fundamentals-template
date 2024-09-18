import { Pipe } from "@angular/core";
import {mockedAuthorsList} from '@shared/mocks/mock'


@Pipe({
    name: 'author'
})
export class AuthorPipe {
    transform(ids: string[] | undefined): string[] {
        if (ids){
        return ids.map(id => {
          const author = mockedAuthorsList.find(author => author.id === id);
          return author ? author.name : 'No Author'; 
        });
      }
      return ["Author not found is authors list!"]
    }
}
