import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { GithubAdapterService, User } from '../services/github-adapter.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  private searchQuery: BehaviorSubject<string> = new BehaviorSubject<string>('');
  protected alert: {message: string, type: 'danger'|'warning'} | boolean  = false;
  @Output() public searchResults = new EventEmitter<User[]>();

  constructor(private searchService: GithubAdapterService) {
    this.alert = { message: 'Just testing', type: 'danger' };
  }

  ngOnInit() {
    this.searchQuery
      .pipe(
        filter((query: string) => query.length > 3),
        debounceTime(300),
        map((queryStr: string) => this.searchService
          .search(queryStr)
          .subscribe(
            (users: User[]) => {
              this.searchResults.emit(users);
            }),
          (error: any) => {
            console.log(`Error: ${error}`);
          }
        ),
    )
      .subscribe();
  }

  private searchTextChanged(value: string) {
    this.searchQuery.next(value);
  }

}

