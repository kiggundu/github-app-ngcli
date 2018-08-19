import { async, ComponentFixture, getTestBed, TestBed, inject } from '@angular/core/testing';
import { of } from 'rxjs';
import * as sinon from 'sinon';
import { GithubAdapterService, User } from '../services/github-adapter.service';
import { configureTestBed } from '../utilities/spec-tools';
import { mockSearchResponse } from './../services/spec.fixtures';
import { SearchBarComponent } from './search-bar.component';
import { By } from '@angular/platform-browser';
import { SearchModule } from '../search/search.module';


describe('SearchBarComponent', () => {
  let testBed: TestBed;
  let theComponent: SearchBarComponent;
  let theComponentFixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    configureTestBed(
      [SearchModule],
    ).compileComponents();
    testBed = getTestBed();
  }));

  beforeEach(() => {
    theComponentFixture = testBed.createComponent(SearchBarComponent);
    theComponent = theComponentFixture.componentInstance;
    theComponentFixture.detectChanges();
  });

  it('should create', () => {
    expect(theComponent).toBeTruthy();
  });

  it('should properly invoke search service', async(
    inject([GithubAdapterService], (theSearchService: GithubAdapterService) => {
      const searchStub = sinon.stub(theSearchService, 'search');
      searchStub.returns(of(mockSearchResponse.items));

      theComponent.ngOnInit();
      theComponent.searchResults
        .subscribe(
          (users: User[]) => {
            expect(users).toBe(mockSearchResponse.items);
          }
        );

      const txtElement = theComponentFixture.debugElement.query(By.css('input'));
      txtElement.nativeElement.value = 'test';
      txtElement.nativeElement.dispatchEvent(new Event('keyup'));
      theComponentFixture.detectChanges();

    })
  ));
});
