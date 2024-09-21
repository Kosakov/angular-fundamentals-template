import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @ViewChild("searchForm") public searchForm!: NgForm;

  @Input() placeholder="Type to want you want to search"
  @Output() search=new EventEmitter<string>();

  onSearch() {
    if (this.searchForm.valid) { 
      this.search.emit(this.searchForm.value.searchInput); 
      //console.log(this.searchForm.value.searchInput)
    }
  }

}

