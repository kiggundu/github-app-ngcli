import { TestBed, inject } from '@angular/core/testing';

import { GithubAdapterService } from './github-adapter.service';
import { SearchModule } from '../search/search.module';

describe('GithubAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubAdapterService]
    });

  });

  it('should be created', inject([GithubAdapterService], (service: GithubAdapterService) => {
    expect(service).toBeTruthy();
  }));

  it('should return valid query results', (done: DoneFn) => {
    console.log('Testing.......');
    const fixture: GithubAdapterService =  TestBed.get(GithubAdapterService);

    fixture.search('fred').subscribe((res) => {
      expect(typeof(res)).toEqual(typeof({}));
      console.log(res);
      done();
    });
  });
});
