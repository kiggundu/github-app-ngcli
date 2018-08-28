import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { SearchModule } from './search/search.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    SearchModule,
    NgbAlertModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
