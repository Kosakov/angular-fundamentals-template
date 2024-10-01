import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @ViewChild("searchForm") public searchForm!: NgForm;

  @Input() placeholder="Type to want you want to search"
  @Output() search=new EventEmitter<string>();

  constructor(private router:Router){}

  onSearch() {
    if (this.searchForm.valid) { 
      const searchValue = this.searchForm.value.searchInput
      //console.log(searchValue)
      this.router.navigate(['/courses/filter'], { queryParams: { title: searchValue } });
      //this.search.emit(this.searchForm.value.searchInput); 
      //console.log(this.searchForm.value.searchInput)
    }
    else{
      this.router.navigate(['/courses'])
  }
    }
    

}

