import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input() searchResults: any;
  baseUrl = "https://cdnjs.com/libraries/";

  constructor() { }

  ngOnInit() {

  }

}
