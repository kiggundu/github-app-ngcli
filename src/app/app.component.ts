import { User } from './services/github-adapter.service';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchModule } from './search/search.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [SearchBarComponent, SearchResultsComponent]
})
export class AppComponent {
  title = 'Github Handle Search';
  foundUsers: User[] = [];

  updateSearchResults(users: User[]) {
    this.foundUsers = users;
  }
}
