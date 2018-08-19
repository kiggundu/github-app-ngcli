import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { SearchModule } from '../search/search.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

export const configureTestBed  = function(imports: any[] = [], providers: any[] = []) {
  return TestBed.configureTestingModule({
    declarations: [
      AppComponent
    ],
    imports: [...imports, HttpClientModule, HttpClientTestingModule, ],
    providers: [...providers]
  });

};
