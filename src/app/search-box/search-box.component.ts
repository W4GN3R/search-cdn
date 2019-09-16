import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Subject,Observable } from 'rxjs';
import {  map, debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  contactForm: FormGroup;
  searchTerm = new Subject<string>();
  baseUrl = "http://api.cdnjs.com/libraries";
  queryUrl = "?search=";
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() searchResults: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.searchTerm.pipe(
      map((e: any) => e.target.value),
      debounceTime(400),
      distinctUntilChanged(),
      filter( term => term.length > 0),
    ).subscribe(searchterm => {
      this.loading.emit(true);
      this._searchEntries(searchterm)
    });
   }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: [null, Validators.required],
      message: [null, Validators.required],
    })
  }

  searchEntries(term): Observable<any> {
    return this.http.get(this.baseUrl + this.queryUrl + term ).pipe(
      map(response => {
        this.searchResults.emit(response);
      })
    )
  }

  _searchEntries(term) {
    this.searchEntries(term).subscribe(Response => {
      this.loading.emit(false);
    }), err => {
      this.loading.emit(false);
    }
  }

}
