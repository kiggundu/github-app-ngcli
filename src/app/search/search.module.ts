import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { GithubAdapterService } from '../services/github-adapter.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    NgbAlertModule,
  ],
  declarations: [SearchBarComponent, SearchResultsComponent],
  exports: [SearchBarComponent, SearchResultsComponent],
  providers: [GithubAdapterService],
})
export class SearchModule { }
