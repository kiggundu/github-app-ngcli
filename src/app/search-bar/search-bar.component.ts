import { GithubAdapterService } from './../services/github-adapter.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { debounce, debounceTime, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  private searchQuery: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private searchResults: BehaviorSubject<any> = new BehaviorSubject<string>(null);

  constructor(private searchService: GithubAdapterService) { }

  ngOnInit() {
    this.searchQuery.pipe(
      filter((query: String) => query.length > 3),
      debounceTime(1000),
      map( (queryStr: string) => this.searchService.search(queryStr).subscribe(this.searchResults)),
    );
  }

  private processKeyPressed(event) {
    this.searchQuery.next(event.target.value);
  }

}

