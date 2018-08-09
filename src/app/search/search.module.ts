import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchResultsComponent } from '../search-results/search-results.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SearchBarComponent, SearchResultsComponent]
})
export class SearchModule { }
