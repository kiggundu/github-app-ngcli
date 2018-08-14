import { Component, OnInit, Input } from '@angular/core';
import { User } from '../services/github-adapter.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  @Input() users: User[];

  constructor() { }

  ngOnInit() {
  }

}
