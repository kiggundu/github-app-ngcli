import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import * as sinon from 'sinon';
import { GithubAdapterService, User } from '../services/github-adapter.service';
import { configureTestBed } from '../utilities/spec-tools';
import { mockSearchResponse } from './../services/spec.fixtures';
import { SearchBarComponent } from './search-bar.component';
import { By } from '@angular/platform-browser';


describe('SearchBarComponent', () => {
  let testBed: TestBed;
  let theComponent: SearchBarComponent;
  let theComponentFixture: ComponentFixture<SearchBarComponent>;
  let theSearchService: GithubAdapterService;

  beforeEach(async(() => {
    configureTestBed(
      [],
      [GithubAdapterService]
    ).compileComponents();
    testBed = getTestBed();
    theSearchService = testBed.get(GithubAdapterService);
  }));

  beforeEach(() => {
    theComponentFixture = testBed.createComponent(SearchBarComponent);
    theComponent = theComponentFixture.componentInstance;
    theComponentFixture.detectChanges();
  });

  it('should create', () => {
    expect(theComponent).toBeTruthy();
  });

  it('should properly invoke search service', (done) => {
    const searchStub = sinon.stub(theSearchService, 'search');
    searchStub.returns(of(mockSearchResponse.items));

    theComponent.ngOnInit();
    theComponent.searchResults
      .subscribe(
        (users: User[]) => {
          expect(users).toBe(mockSearchResponse.items);
          done();
        }
      );

    const txtElement = theComponentFixture.debugElement.query(By.css('input'));
    txtElement.nativeElement.value = 'test';
    txtElement.nativeElement.dispatchEvent(new Event('keyup'));
    theComponentFixture.detectChanges();

  });
});
