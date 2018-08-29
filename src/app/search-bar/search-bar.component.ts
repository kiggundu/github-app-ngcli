import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { GithubAdapterService, User, UsersResponse } from '../services/github-adapter.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  private searchQuery: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public alert: { message: string, type: 'danger' | 'warning' | 'info' } | boolean;
  @Output() public searchResults = new EventEmitter<User[]>();

  constructor(private searchService: GithubAdapterService) {
    this.alert = false;
  }

  ngOnInit() {
    this.searchQuery
      .pipe(
        tap((query: string) => { console.log(`The Query: ${query}`); }),
        filter((query: string) => query.length > 3),
        debounceTime(300),
        switchMap((queryStr: string) => {
          this.alert = { message: 'Searching...', type: 'info' };
          return this.searchService.search(queryStr);
        }),
      )
      .subscribe(
        (response: UsersResponse) => {
          if (!response.error) {
            this.searchResults.emit(response.users);
            this.alert = false;
          } else {
            this.searchResults.emit(response.users);
            this.alert = { message: response.error, type: 'warning' };
          }
        },
        (error) => {
          this.searchResults.emit([]);
          this.alert = { message: error, type: 'danger' };
        },
        () => {
          console.log('Observable prematurely complete!');
          this.alert = { message: 'No more queries allowed. See logs for details', type: 'warning' };
        }
      );
  }

  public searchTextChanged(value: string) {
    this.alert = false;
    this.searchQuery.next(value);
  }

}

