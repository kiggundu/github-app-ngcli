import { HttpRequest } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { getTestBed } from '@angular/core/testing';
import { configureTestBed } from '../utilities/spec-tools';
import { GithubAdapterService, User } from './github-adapter.service';
import { mockSearchResponse } from './spec.fixtures';


describe('GithubAdapterService', () => {

  let testBed;
  let searchServiceSut: GithubAdapterService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    configureTestBed([]);

    testBed = getTestBed();
    searchServiceSut = testBed.get(GithubAdapterService);
    httpMock = testBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(searchServiceSut).toBeTruthy();
  });

  it('should return valid query results', (done: DoneFn) => {
    const testQuery = 'test';
    searchServiceSut.search(testQuery).subscribe((users: User[]) => {
      expect(users).toEqual(mockSearchResponse.items); // check that the mock users are returned
      done();
    });

    const successfulRequest = httpMock.expectOne((req: HttpRequest<any>): boolean => {
      return req.url.indexOf(`q=${testQuery}`) > 0;
    });
    successfulRequest.flush({ body: JSON.stringify(mockSearchResponse) });
    expect(successfulRequest.request.urlWithParams).toEqual(`${searchServiceSut.endpoint}?q=${testQuery}`);

    httpMock.verify();
  });
});
