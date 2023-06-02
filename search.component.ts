import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  
  enteredSearchValue:string = '';

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  // we need to call this method whenever user inputs something
  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSearchValue);  // we want to emit value stored in searchValue 
  }

}
