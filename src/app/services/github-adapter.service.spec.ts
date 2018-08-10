import { TestBed, inject } from '@angular/core/testing';

import { GithubAdapterService } from './github-adapter.service';

describe('GithubAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubAdapterService]
    });
  });

  it('should be created', inject([GithubAdapterService], (service: GithubAdapterService) => {
    expect(service).toBeTruthy();
  }));
});
