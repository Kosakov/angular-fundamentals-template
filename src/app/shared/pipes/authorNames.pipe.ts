import { Pipe } from "@angular/core";
//import {mockedAuthorsList} from '@shared/mocks/mock'
import { CoursesStoreService } from '@app/services/courses-store.service';


@Pipe({
    name: 'author'
})
export class AuthorPipe {
  constructor(private CoursesStoreService:CoursesStoreService){}
  allAuthorsArr:any[]=[]

    transform(ids: string[] | undefined): string[] {
      this.CoursesStoreService.getAllAuthors()
      this.CoursesStoreService.authors$.subscribe((author)=>{
      author.result.map((res)=>{
        console.log
         //this.allAuthorsArr.push(res)
      })
       
      })
        if (ids){
          //console.log(this.allAuthorsArr)
        return ids.map(id => {
          const author = this.allAuthorsArr.find(author => author.id === id);
          return author ? author.name : 'No Author'; 
        });
      }
      return ["Author not found is authors list!"]
    }
}
