import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';
import { GithubAdapterService, User } from './github-adapter.service';
import { configureTestBed } from '../utilities/spec-tools';

describe('GithubAdapterService', () => {

  const mockUsersResponse = {
    items: [
      {
        login: 'fredtest',
        avatar_url: 'http://example.com'
      },
      {
        login: 'bentest',
        avatar_url: 'http://example.com'
      }
    ]
  };


  beforeEach(() => {
    configureTestBed([]);

  });

  it('should be created', () => {
    const testBed = getTestBed();
    const service = testBed.get(GithubAdapterService);
    expect(service).toBeTruthy();
  });

  it('should return valid query results', (done: DoneFn) => {
    console.log('Testing.......');
    const testQuery = 'test';
    const testBed = getTestBed();
    const fixture: GithubAdapterService = testBed.get(GithubAdapterService);

    const httpMock: HttpTestingController = testBed.get(HttpTestingController);

    console.log(fixture.endpoint);
    fixture.search(testQuery).subscribe((users: User[]) => {
      expect(users).toEqual(mockUsersResponse.items); // check that the mock users are returned
      done();
    });

    const successfulRequest = httpMock.expectOne((req: HttpRequest<any>): boolean => {
      return req.url.startsWith(fixture.endpoint);
    });
    successfulRequest.flush({ body: JSON.stringify(mockUsersResponse) });
    console.log((successfulRequest.request.params));
    expect(successfulRequest.request.urlWithParams).toEqual(`${fixture.endpoint}?q=${testQuery}`);



    httpMock.verify();

  });
});
