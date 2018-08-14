import { HttpRequest } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, async } from '@angular/core/testing';
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
    searchServiceSut
      .search(testQuery)
      .subscribe(
        (users: User[]) => {
          expect(users).toEqual(mockSearchResponse.items); // check that the mock users are returned
          done();
        },
        (error: any) => {
          fail('Did not expect an error');
          done();
        }
      );

    const successfulRequest = httpMock.expectOne((req: HttpRequest<any>): boolean => {
      return req.url.indexOf(`q=${testQuery}`) > 0;
    });
    successfulRequest.flush({ body: JSON.stringify(mockSearchResponse) });
    expect(successfulRequest.request.urlWithParams).toEqual(`${searchServiceSut.endpoint}?q=${testQuery}`);

    httpMock.verify();
  });

  it('should handle serverside errors', async(() => {
    const testQuery = 'test';
    searchServiceSut
      .search(testQuery)
      .subscribe(
        (users: User[]) => {
          fail('Expected a subscription error');
          console.log('1111111');
          // done();
        },
        (error: any) => {
          expect(error.status).toBe(500);
          console.log('2222222');
          // done();
        }
      );

    const failedRequest = httpMock.expectOne((req: HttpRequest<any>): boolean => {
      return req.url.indexOf(`q=${testQuery}`) > 0;
    });
    failedRequest.error(new ErrorEvent('internal error'), {headers: {}, status: 500, statusText: 'Server side failure'});
    expect(failedRequest.request.urlWithParams).toEqual(`${searchServiceSut.endpoint}?q=${testQuery}`);

    httpMock.verify();
  }));
});
