import { GithubAdapterService } from './../services/github-adapter.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { HttpModule, Http, ConnectionBackend } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
  ],
  declarations: [SearchBarComponent, SearchResultsComponent],
  exports: [SearchBarComponent, SearchResultsComponent],
  providers: [GithubAdapterService]
})
export class SearchModule { }
